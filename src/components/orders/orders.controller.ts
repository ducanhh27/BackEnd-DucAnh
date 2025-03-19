import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/payment/payment.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.createOrder(createOrderDto);
  }
  @Get()
  async getAllOrders() {
    return this.orderService.getAllOrders();
  }
  @Get('status')
  async getOrderStatus(@Query('app_trans_id') appTransId: string) {
    return this.orderService.getOrderStatus(appTransId);
  }

  @Get('/monthly-revenue')
  async getMonthlyRevenue() {
    const revenueData = await this.orderService.getMonthlyRevenue();
    return revenueData.map(({ _id, revenue, orders }) => ({
      month: `Tháng ${_id > 12 ? 12 : _id}`, // Nếu _id > 12 thì sẽ là Tháng 12
      revenue,
      orders,
    }));
  }
  @Get('top-customers')
  async getTopCustomers() {
    return this.orderService.getTopCustomers();
  }

  @Get('best-selling-categories')
  async getBestSellingCategories() {
    return this.orderService.getBestSellingCategories();
  }
  // Cap nhat don hang
  @Patch(':id/delivery-status')
  async updateDeliveryStatus(
    @Param('id') orderId: string,
    @Body('deliveryStatus') deliveryStatus: string,
  ) {
    return this.orderService.updateDeliveryStatus(orderId, deliveryStatus);
  }

  //Lay don hang theo id
  @Get('orderuser')
  @UseGuards(AuthGuard)
    async getOrderUser(@Req() req){
      const userId = req.user.userId;
      return this.orderService.getOrderUser(userId)
    }
}
