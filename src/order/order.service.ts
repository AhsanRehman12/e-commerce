import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schema/order.schema';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private OrderModel: Model<Order>) { }
  async createOder(userId: string, shippingAddress: object, orderItems: Array<Object>) {
    try {
      const creatingOrder = await this.OrderModel.create({ userId, shippingAddress, orderItems })
      return creatingOrder;
    } catch (error) {
      console.log(error)
    }
  }
}