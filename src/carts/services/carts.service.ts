import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart, CartItem } from '../entities/cart.entity';
import { Model, Types } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CartsService {
  constructor(@InjectModel(Cart.name) private cartsModel: Model<Cart>) {}

  create(): Promise<Cart> {
    const newCart = new this.cartsModel();
    return newCart.save();
  }

  async findAll() {
    return this.cartsModel.find().populate({
      path: 'list',
      populate: {
        path: 'productID',
        select: ['name', 'price', 'stock', 'brand', 'images'],
        populate: {
          path: 'brand',
          select: ['name', 'image'],
        },
        model: 'Product',
      },
    });
  }

  async findOne(cartID: string): Promise<Cart> {
    const cart = await this.cartsModel.findById(cartID).populate({
      path: 'list',
      populate: {
        path: 'productID',
        select: ['name', 'price', 'stock', 'brand', 'images'],
        populate: {
          path: 'brand',
          select: ['name', 'image'],
        },
        model: 'Product',
      },
    });
    if (!cart) throw new NotFoundException(`Cart #${cartID} not found.`);
    return cart;
  }

  async delete(cartID: string) {
    const cart = await this.cartsModel.findByIdAndDelete(cartID);
    if (!cart) throw new NotFoundException(`Cart #${cartID} not found.`);
    return cart;
  }

  async modifyProductQty(cartID: string, productID: string, quantity: number) {
    const cart = await this.findOne(cartID);
    const productIndex = cart.list.findIndex(
      (cartItem) => cartItem.productID._id.toString() === productID,
    );
    if (productIndex === -1) {
      cart.list.push({ productID, quantity: 1 });
      return cart.save();
    }
    const cartProduct = cart.list[productIndex];
    if (cartProduct.quantity >= (<Product>cartProduct.productID).stock && quantity > 0) {
      throw new BadRequestException(
        `You have reached the top of stock for product #${productID}`,
      );
    }
    cartProduct.quantity += quantity;
    if (cartProduct.quantity === 0) cart.list.pull(cartProduct);
    return cart.save();
  }

  async deleteProduct(cartID: string, productID?: string) {
    const cart = await this.cartsModel.findById(cartID);
    if (!productID) {
      cart.list = new Types.Array<CartItem>
      return cart.save()
    }    
    if (!cart) throw new NotFoundException(`Cart #${cartID} not found.`);
    const cartItem = cart.list.find(
      (product) => product.productID.toString() === productID,
    );
    cart.list.pull(cartItem);
    return cart.save();
  }
}
