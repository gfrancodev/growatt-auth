import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteRoleDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
