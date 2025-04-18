import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Reviews } from 'src/schema/reviews/review.schema';
import { Orders } from 'src/schema/order/orders.schema';
import { CreateReviewDto } from 'src/dto/reviews/reviews.dto';

@Injectable()
export class ProductReviewService {
  constructor(
    @InjectModel(Reviews.name) private readonly reviewModel: Model<Reviews>,
    @InjectModel(Orders.name) private readonly orderModel: Model<Orders>,
  ) {}

  async createReview(dto: CreateReviewDto, userId: string) {
    const { productId, orderId, rating, comment } = dto;

    // Chuyển đổi userId thành ObjectId
  const userObjectId = new mongoose.Types.ObjectId(userId);

    // 1. Kiểm tra đơn hàng đã hoàn thành, thuộc về user, có sản phẩm
    const order = await this.orderModel.findOne({
      _id: orderId,
      customerId: userId,
      deliveryStatus: 'Đã giao hàng',
      items: {
        $elemMatch: { // Sử dụng $elemMatch để tìm trong mảng
          _id: productId, // 
        },
      },
    });

    if (!order) {
      throw new BadRequestException('Đơn hàng không hợp lệ hoặc chưa hoàn thành.');
    }

    // 2. Kiểm tra đã đánh giá chưa
    const existingReviews = await this.reviewModel.find({
      user: userId,
      product: productId,
      order: orderId,
    });

    if (existingReviews.length >= 2) {
      throw new BadRequestException('Bạn đã đánh giá sản phẩm này đủ 2 lần.');
    }

    const type = existingReviews.length === 0 ? 'initial' : 'additional';

    // 3. Lưu đánh giá
    const newReview = await this.reviewModel.create({
      user: userId,
      product: productId,
      order: orderId,
      rating,
      comment,
      type,
    });

    return newReview;
  }

  async getProductReviews(productId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return this.reviewModel
      .find({ product: productId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'name avatar');
  }

  async getUserReview(userId: string, productId: string, orderId: string) {
    return this.reviewModel.find({
      user: userId,
      product: productId,
      order: orderId,
    });
  }
}
