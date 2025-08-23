import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schema/order.schema';
import { ProductOrderDto } from './dto/product.order.dto';
import { AddressDto } from './dto/address.dto';
import { CancelOrderDto } from './dto/cancelOrder.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) { }
  async createOrder(userId?: string, list_Items?: ProductOrderDto[] | undefined, customerDetail?: AddressDto | null) {
    console.log(list_Items, 'lllll')
    const newOrder = await this.orderModel.create({
      userId,
      list_Items,
      customerDetail,
    })
    return { success: true, message: 'Order is created Successfully', newOrder }
  }

  async canelOrder(orderId: string, userInfo: CancelOrderDto) {
    const updateStatus = await this.orderModel.findOneAndUpdate({ _id: orderId, userId: userInfo.userId }, { status: userInfo.status }, { new: true })
    return updateStatus;
  }
}