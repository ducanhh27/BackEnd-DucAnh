import { Type } from 'class-transformer';
import { IsArray, ValidateNested, IsMongoId, IsInt, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CartItemDto {
  @ApiProperty({
    description: 'ID sản phẩm, phải là MongoDB ObjectId hợp lệ',
    example: '645f7d5e0d5c2a00123abcd4',
  })
  @IsMongoId({ message: 'productId must be a valid MongoDB ID' })
  productId: string;

  @ApiProperty({
    description: 'Số lượng sản phẩm, phải là số nguyên và >= 1',
    example: 2,
    minimum: 1,
    type: 'integer',
  })
  @IsInt({ message: 'Quantity must be an integer' })
  @Min(1, { message: 'Quantity must be at least 1' })
  quantity: number;
}

export class AddToCartDto {
  @ApiProperty({
    description: 'Danh sách sản phẩm thêm vào giỏ hàng',
    type: [CartItemDto],
  })
  @IsArray({ message: 'items must be an array' })
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];
}

export class RemoveFromCartDto {
  @ApiProperty({
    description: 'ID sản phẩm cần xóa khỏi giỏ hàng',
    example: '645f7d5e0d5c2a00123abcd4',
  })
  @IsMongoId({ message: 'productId must be a valid MongoDB ID' })
  productId: string;
}