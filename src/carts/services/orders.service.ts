import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from '../entities/order.entity';
import { Model, Types } from 'mongoose';
import { CreateOrderDTO } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private ordersModel: Model<Order>) {}

  create(order: CreateOrderDTO) {
    const newOrder = new this.ordersModel(order);
    return newOrder.save();
  }

  async findAll() {
    return this.ordersModel.find();
  }

  async findOne(orderID: string) {
    const order = await this.ordersModel.findById(orderID);
    if (!order) throw new NotFoundException(`Order #${orderID} not found.`);
    return order;
  }

  async findByUser(userID: string) {
    const orders = await this.ordersModel.find({
      'user._id': new Types.ObjectId(userID),
    });
    if (orders.length === 0)
      throw new NotFoundException(
        `There are not orders for User #${userID}`,
      );
    return orders;
  }

  async updateStatus(orderID: string, status: string) {
    const order = await this.ordersModel.findByIdAndUpdate(
      orderID,
      { $set: { status } },
      { new: true },
    );
    if (!order) throw new NotFoundException(`Order #${orderID} not found.`);
    return order;
  }

  async delete(orderID: string) {
    const order = await this.ordersModel.findByIdAndDelete(orderID);
    if (!order) throw new NotFoundException(`Order #${orderID} not found.`);
    return order;
  }
}
