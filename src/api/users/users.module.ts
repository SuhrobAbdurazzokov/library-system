import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CryptoService } from 'src/common/bcrypt/crypto';
import { TokenService } from 'src/common/token/token';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/core/entity/users.entity';
import { Borrow } from 'src/core/entity/borrow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Borrow])],
  controllers: [UsersController],
  providers: [UsersService, CryptoService, TokenService],
  exports: [UsersService],
})
export class UsersModule {}
