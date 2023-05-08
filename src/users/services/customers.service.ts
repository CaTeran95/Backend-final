import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Customer } from '../entities/customer.entity';
import { CreateCustomerDTO, UpdateCustomerDTO } from '../dtos/customers.dto';
import { CartsService } from 'src/carts/services/carts.service';
import { Product } from 'src/products/entities/product.entity';
import { OrdersService } from 'src/carts/services/orders.service';
import { Brand } from 'src/products/entities/brand.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
    private cartsService: CartsService,
    private ordersService: OrdersService,
  ) {}

  async create(data: CreateCustomerDTO) {
    const newCustomer = new this.customerModel(data);
    return newCustomer.save();
  }

  async findAll() {
    return this.customerModel.find();
  }

  async findOne(customerID: string): Promise<Customer> {
    const customer = await this.customerModel.findById(customerID);
    if (!customer)
      throw new NotFoundException(`Customer #${customerID} not found.`);
    return customer;
  }

  async checkCustomer(customerEmail: string): Promise<Customer> {
    const customer = await this.customerModel.findOne(
      { email: customerEmail },
      {},
      { lean: true },
    );
    console.log('First customer', customer);
    return customer;
  }

  async update(customerID: string, changes: UpdateCustomerDTO) {
    const customer = await this.customerModel.findByIdAndUpdate(
      customerID,
      { $set: changes },
      { new: true },
    );
    if (!customer)
      throw new NotFoundException(`Customer #${customerID} not found.`);
    return customer;
  }

  async delete(customerID: string) {
    const customer = await this.customerModel.findByIdAndDelete(customerID);
    if (!customer)
      throw new NotFoundException(`Customer #${customerID} not found.`);
    this.cartsService.delete(customer.cartID.toString());
    return customer;
  }

  async setFavorite(customerID: string, productID: string) {
    const customer = await this.findOne(customerID);
    const index = customer.favorites.findIndex((item) => item._id == productID);
    if (index === -1) {
      customer.favorites.push(productID);
    } else {
      customer.favorites.pull(productID);
    }
    await customer.save();
    return customer.favorites;
  }

  async addOrder(customerID: string) {
    const customer = await this.findOne(customerID);
    const cart = await this.cartsService.findOne(customer.cartID.toString());
    await cart.populate({
      path: 'list',
      populate: {
        path: 'productID',
        select: ['name', 'price', 'brand', 'images'],
        populate: {
          path: 'brand',
          select: ['name', 'image'],
        },
        model: 'Product',
      },
    });
    // Order products list formatting:
    const list = cart.list.map((product) => {
      const { _id, images, name, brand, price } = <Product>product.productID;
      return {
        productID: _id,
        images,
        name,
        brand: <Brand>brand,
        price,
        quantity: product.quantity,
      };
    });
    // Order customer formatting:
    const { _id, name, email, avatar, alias, phoneNumber, address, personalID } =
      customer;
    const orderCustomer = {
      _id,
      name,
      email,
      avatar,
      alias,
      phoneNumber,
      address,
      personalID,
    };
    const newOrder = {
      customer: orderCustomer,
      creationDate: new Date(),
      list,
    };
    const order = await this.ordersService.create(newOrder);
    await this.cartsService.deleteProduct(customer.cartID.toString());
    customer.orders.push(order.id);
    await customer.save();
    return order;
  }

  async deleteOrder(customerID: string, orderID: string) {
    const customer = await this.findOne(customerID);
    const deletedOrder = await this.ordersService.delete(orderID);
    customer.orders.pull(orderID);
    await customer.save();
    return deletedOrder;
  }
}
