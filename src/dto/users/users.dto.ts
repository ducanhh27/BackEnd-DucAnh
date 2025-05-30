import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    example: 'Nguyễn Anh Đức',
    description: 'Tên đầy đủ của người dùng',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'nguyenanhduc@example.com',
    description: 'Email hợp lệ',
  })
  @IsEmail({}, { message: 'Email phải có dạng email hợp lệ!' })
  email: string;

  @ApiProperty({
    example: 'nganhduc123',
    description: 'Tên đăng nhập (username)',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: '0987654321',
    description: 'Số điện thoại gồm 10 chữ số',
  })
  @Matches(/^[0-9]{10}$/, { message: 'Số điện thoại phải chứa từ 10 đến 15 chữ số!' })
  phone: string;

  @ApiProperty({
    example: 'password1',
    description: 'Mật khẩu phải dài hơn 6 ký tự và chứa ít nhất 1 số',
  })
  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải dài hơn 6 ký tự!' })
  @Matches(/^(?=.*[0-9])/, { message: 'Mật khẩu phải bao gồm ít nhất một số!' })
  password: string;

  @ApiProperty({
    example: 'Khương Đình, Thanh Xuân, Hà Nội',
    description: 'Địa chỉ nơi ở của người dùng',
  })
  @IsString()
  @MinLength(10, { message: 'Địa chỉ phải có ít nhất 10 ký tự!' })
  @MaxLength(100, { message: 'Địa chỉ không được vượt quá 100 ký tự!' })
  address: string;
}

export class LogInDto {
  @ApiProperty({
    example: 'username123',
    description: 'Tên đăng nhập',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'password1',
    description: 'Mật khẩu đăng nhập',
  })
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'Nguyễn Văn B',
    description: 'Tên mới của người dùng (nếu cập nhật)',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: '456 Đường XYZ, Quận 5, TP.HCM',
    description: 'Địa chỉ mới của người dùng (nếu cập nhật)',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: '0911222333',
    description: 'Số điện thoại mới (nếu cập nhật)',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: 'newpassword123',
    description: 'Mật khẩu mới (nếu cập nhật)',
  })
  @IsOptional()
  @IsString()
  password?: string;
}


export class ForgotPasswordDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email đã đăng ký tài khoản',
  })
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({
    example: 'reset-token-123',
    description: 'Token được gửi qua email',
  })
  @IsString()
  token: string;

  @ApiProperty({
    example: 'NewPassword123',
    description: 'Mật khẩu mới',
  })
  @IsString()
  @MinLength(6)
  newPassword: string;
}