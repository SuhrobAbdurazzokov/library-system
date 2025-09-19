import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryDto {
  @ApiProperty({
    type: 'string',
    example: 'Abdulla Qodiriy',
    description: 'nimani qidirayotganiz :',
  })
  @IsString()
  @IsOptional()
  query?: string;

  @ApiProperty({
    type: 'string',
    example: 'Author',
    description: "nimasi bo'yicha qidirayotganiz (author, title va h.k):",
  })
  @IsString()
  @IsOptional()
  search: string;
}
