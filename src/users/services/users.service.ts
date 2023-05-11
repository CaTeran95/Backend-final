import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { Role, User } from '../entities/user.entity';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/users.dto';
import { Product } from 'src/products/entities/product.entity';
import { Brand } from 'src/products/entities/brand.entity';
import { CartsService } from 'src/carts/services/carts.service';
import { OrdersService } from 'src/carts/services/orders.service';
import { MailerService } from 'src/mailer/services/mailer.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<User>,
    private cartsService: CartsService,
    private ordersService: OrdersService,
    private mailerService: MailerService,
  ) {}

  async create(data: CreateUserDTO) {
    const user = await this.usersModel.findOne({ email: data.email });
    if (user)
      throw new BadRequestException('This email is already registered.');
    const saltOrRounds = 3;
    const password = await bcrypt.hash(data.password, saltOrRounds);
    const newUser = new this.usersModel({ ...data, password });

    // await this.mailerService.sendMail(newUser, 'newRegister', 'New user!');

    return newUser.save();
  }

  async findAll() {
    return this.usersModel.find({}, { password: 0 });
  }

  async findOne(userID: string): Promise<User> {
    const user = await this.usersModel.findById(userID, { password: 0 });
    if (!user) throw new NotFoundException(`User #${userID} not found.`);
    return user;
  }

  async getUser(email: string): Promise<User> {
    const user = await this.usersModel.findOne(
      { email },
      { role: 1, password: 1 },
      { lean: true },
    );
    return user;
  }

  async update(userID: string, changes: UpdateUserDTO) {
    const user = await this.usersModel.findByIdAndUpdate(
      userID,
      { $set: changes },
      { new: true },
    );
    if (!user) throw new NotFoundException(`User #${userID} not found.`);
    return user;
  }

  async delete(userID: string) {
    const user = await this.usersModel.findByIdAndDelete(userID);
    if (!user) throw new NotFoundException(`User #${userID} not found.`);
    this.cartsService.delete(user.cartID.toString());
    return user;
  }

  async setFavorite(userID: string, productID: string) {
    const user = await this.findOne(userID);
    const index = user.favorites.findIndex((item) => item._id == productID);
    if (index === -1) {
      user.favorites.push(productID);
    } else {
      user.favorites.pull(productID);
    }
    await user.save();
    return user.favorites;
  }

  async getOrders(userID: string) {
    const userOrders = await this.usersModel
      .findById(userID, {
        _id: 0,
        orders: 1,
      })
      .populate({
        path: 'orders',
        select: ['user', 'creationDate', 'list', 'status'],
      });
    return userOrders;
  }

  async addOrder(userID: string) {
    const user = await this.findOne(userID);
    const cart = await this.cartsService.findOne(user.cartID.toString());
    if (cart.list.length === 0)
      throw new BadRequestException(
        "You can't generate orders from an empty cart.",
      );
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
    /* Order products list formatting: */
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
    /* Order user formatting: */
    const {
      _id,
      name,
      email,
      avatar,
      alias,
      phoneNumber,
      address,
      personalID,
    } = user;
    const orderUser = {
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
      user: orderUser,
      creationDate: new Date(),
      list,
    };
    const order = await this.ordersService.create(newOrder);
    await this.mailerService.sendMail(order, 'newOrder', 'New order!');
    await this.cartsService.deleteProduct(user.cartID.toString());
    user.orders.push(order.id);
    await user.save();
    return order;
  }

  async deleteOrder(userID: string, orderID: string) {
    const user = await this.findOne(userID);
    const deletedOrder = await this.ordersService.delete(orderID);
    user.orders.pull(orderID);
    await user.save();
    return deletedOrder;
  }

  async setUserRole(userID: string, role: Role) {
    const user = await this.usersModel.findByIdAndUpdate(
      userID,
      { $set: { role } },
      { new: true },
    );
    if (!user) throw new NotFoundException(`User #${userID} not found.`);
    return user;
  }
}
