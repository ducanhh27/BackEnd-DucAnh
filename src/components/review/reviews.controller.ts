import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    Query,
    Req,
    UseGuards,
    BadRequestException,
  } from '@nestjs/common';

import { ProductReviewService } from './reviews.service';
import { CreateReviewDto } from 'src/dto/reviews/reviews.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
  
  @Controller('reviews')
  export class ProductReviewController {
    constructor(private readonly reviewService: ProductReviewService) {}
  
    // Tạo đánh giá (lần đầu hoặc bổ sung)
    @Post()
    @UseGuards(AuthGuard) 
    async createReview(@Body() dto: CreateReviewDto, @Req() req: any) {
      const userId = req.user._id;
      return this.reviewService.createReview(dto, userId);
    }
  
    // Lấy tất cả đánh giá của 1 sản phẩm
    @Get('product/:productId')
    async getProductReviews(
      @Param('productId') productId: string,
      @Query('page') page = 1,
      @Query('limit') limit = 10,
    ) {
      return this.reviewService.getProductReviews(productId, +page, +limit);
    }
  
    // Lấy đánh giá của user cho 1 sản phẩm trong 1 đơn hàng
    @Get('me')
    @UseGuards(AuthGuard) 
    async getUserReview(
      @Req() req: any,
      @Query('productId') productId: string,
      @Query('orderId') orderId: string,
    ) {
      const userId = req.user._id;
      if (!productId || !orderId) {
        throw new BadRequestException('Thiếu productId hoặc orderId');
      }
      return this.reviewService.getUserReview(userId, productId, orderId);
    }
  }
  