import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class QueryPaginationDto {
  @ApiPropertyOptional({
    type: 'string',
    example: 'model',
    description: 'Query for search',
  })
  @IsString()
  @IsOptional()
  query?: string;

  @ApiPropertyOptional({
    type: 'string',
    example: '1',
    description: 'page',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    type: 'string',
    example: '10',
    description: 'limit',
  })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit?: number;
}
