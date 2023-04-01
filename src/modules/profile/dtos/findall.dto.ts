import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class FindAllProfileDTO {
  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  page: number;
}
