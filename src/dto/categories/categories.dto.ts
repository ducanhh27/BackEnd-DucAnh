import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Types } from 'mongoose';

export enum CategoryStatus {
  ACTIVE = 1,
  INACTIVE = 0, // sửa lỗi chính tả INACTiVE -> INACTIVE
}

export class CreateCategoryCreateDto {
  @ApiPropertyOptional({ type: String, description: 'ID của danh mục (MongoDB ObjectId)' })
  @IsOptional()
  @IsString() // đổi từ IsNumber thành IsString vì ObjectId là string dạng hex
  id?: Types.ObjectId;

  @ApiProperty({ type: String, description: 'Tên danh mục', example: 'Hoa' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: String, description: 'Slug của danh mục', example: 'hoa' })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional({
    enum: CategoryStatus,
    enumName: 'CategoryStatus',
    description: 'Trạng thái danh mục',
    example: CategoryStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(CategoryStatus)
  status?: CategoryStatus;

  @ApiPropertyOptional({ type: String, description: 'Mô tả danh mục', example: 'Danh mục các loại hoa tươi' })
  @IsOptional()
  @IsString()
  description?: string;
}
