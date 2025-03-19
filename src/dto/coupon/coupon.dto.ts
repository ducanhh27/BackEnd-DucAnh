import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsDate, IsBoolean, IsEnum, Min } from 'class-validator';


export enum CouponType {
    PERCENTAGE = 'percentage',
    AMOUNT = 'amount',
  }

export class CreateCouponDto {
  @IsString()
  code: string;

  @IsEnum(CouponType) // ✅ Đúng cách sử dụng Enum
  type: CouponType;

  @IsNumber()
  discount_value: number;

  @IsNumber()
  max_usage: number;

  @IsNumber()
  usage_per_user: number;

  @IsNumber()
  @Min(0)
  minimum_orders: number; 

  @Transform(({ value }) => new Date(value)) // ✅ Chuyển đổi từ string -> Date
  @IsDate()
  start_date: Date;

  @Transform(({ value }) => new Date(value)) // ✅ Chuyển đổi từ string -> Date
  @IsDate()
  end_date: Date;

  @IsBoolean()
  is_active: boolean;
}

export class ApplyCouponDto {
  @IsString()
  code: string;
}
