import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequesConfirmEmailDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
}