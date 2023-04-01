import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  photo?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  age?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  experience?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  occupation?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  charge?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  course?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  institute?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  graduation?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  bussiness?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  linkedin?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  twitter?: string;
}
