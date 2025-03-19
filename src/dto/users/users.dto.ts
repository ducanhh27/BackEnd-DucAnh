import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignUpDto {

    @IsString()
    name: string;
    
    @IsEmail()
    email: string;

    @IsString()
    username: string;

    @Matches(/^[0-9]{10}$/, { message: 'Số điện thoại phải chứa từ 10 đến 15 chữ số!' })
    phone: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/,{message:'Mật khẩu phải bao gồm ít nhất một số!'})
    password: string;

    @IsString()
    @MinLength(10, { message: 'Địa chỉ phải có ít nhất 10 ký tự!' })
    @MaxLength(100, { message: 'Địa chỉ không được vượt quá 100 ký tự!' })
    address: string;
  }

  export class LogInDto {
    @IsString()
    username: string;

    @IsString()
    password: string;
  }