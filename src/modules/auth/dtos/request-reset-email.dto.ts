import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RequesResetEmailDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;
}
