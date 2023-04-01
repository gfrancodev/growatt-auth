import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class FindAllRoleDTO {
  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  page: number;
}
