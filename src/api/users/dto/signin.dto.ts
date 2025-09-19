import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({ type: 'string', example: 'ssuhrobabdurazzoqov@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: 'string', example: 'Suhrob1222!' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
