import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({
    type: 'string',
    example: "O'tkan Kunlar",
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    type: 'string',
    example: 'Abdulla Qodiriy',
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({
    type: 'number',
    example: 1926,
    nullable: true,
  })
  @IsNumber()
  @IsOptional()
  publishedYear: number;

  @ApiProperty({
    type: 'boolean',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  available: boolean;
}
