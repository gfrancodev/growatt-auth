import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class RequestResetPasswordDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
