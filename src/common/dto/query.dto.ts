import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @ApiProperty({
    type: 'string',
    description: 'row',
    required: false,
  })
  @IsString()
  @IsOptional()
  query?: string;

  @ApiProperty({
    type: 'string',
    description: 'column',
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
