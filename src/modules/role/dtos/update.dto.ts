import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRoleDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
