import { Body, Controller, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';
import { AuthenticatedRequest } from 'src/utils/user.interface';
import { OrderDto } from './dto/order.dto';

@Controller('order')
@UseGuards(AuthGuard('jwt'))
export class OrderController {
  constructor(private orderService:OrderService){}
  async createOrder(@Request() req:AuthenticatedRequest,@Body() orderData:OrderDto){
    return this.orderService.createOder(req.user.userId,orderData.shippingAddress,orderData.items)
  }
}
