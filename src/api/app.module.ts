import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from './users/users.module';
import { BookModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.DB_URI,
      autoLoadEntities: true,
      synchronize: config.DB_SYNC,
    }),
    JwtModule.register({
      global: true,
    }),
    UsersModule,
    BookModule,
    BorrowModule,
  ],
})
export class AppModule {}
