import { Module } from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { BorrowController } from './borrow.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Borrow } from 'src/core/entity/borrow.entity';
import { UsersModule } from '../users/users.module';
import { BookModule } from '../book/book.module';
import { Users } from 'src/core/entity/users.entity';
import { Book } from 'src/core/entity/book.entity';
import { BookHistory } from 'src/core/entity/book-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Borrow, Users, Book, BookHistory]),
    BookModule,
    UsersModule,
  ],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
