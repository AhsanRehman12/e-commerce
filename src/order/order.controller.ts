import { Body, Controller, Param, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CancelOrderDto } from './dto/cancelOrder.dto';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) { }
  @Put('/:id')
  cancelOrder(@Param('id') id: string, @Body() userInfo:CancelOrderDto) {
    return this.orderService.canelOrder(id, userInfo)
  }
}
