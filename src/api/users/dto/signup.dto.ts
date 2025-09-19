import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UsersRole } from 'src/common/enum/users-role.enum';

export class SignUpDto {
  @ApiProperty({
    type: 'string',
    example: 'Suhrob Abdurazzoqov',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    type: 'string',
    example: 'ssuhrobabdurazzoqov@gmail.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: 'string', example: 'Suhrob1222!' })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;

  @IsEnum(UsersRole)
  @IsOptional()
  role: UsersRole.READER;
}
