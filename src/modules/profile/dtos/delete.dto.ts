import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteProfileDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
