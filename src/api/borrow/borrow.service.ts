import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { Borrow } from 'src/core/entity/borrow.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { BorrowRepository } from 'src/core/repository/borrow.repository';
import { BookService } from '../book/book.service';
import { UsersService } from '../users/users.service';
import { getSuccessRes } from 'src/common/util/get-success-res';
import { DataSource } from 'typeorm';
import { Users } from 'src/core/entity/users.entity';
import { Book } from 'src/core/entity/book.entity';
import { BookHistory } from 'src/core/entity/book-history.entity';

@Injectable()
export class BorrowService extends BaseService<
  CreateBorrowDto,
  UpdateBorrowDto,
  Borrow
> {
  constructor(
    @InjectRepository(Borrow) private readonly borrowRepo: BorrowRepository,
    private readonly dataSource: DataSource,
    private readonly bookService: BookService,
    private readonly usersService: UsersService,
  ) {
    super(borrowRepo);
  }

  async createBorrow(createBorrowDto: CreateBorrowDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { bookId, userId } = createBorrowDto;

      const existsUser = await queryRunner.manager.findOneBy(Users, {
        id: userId,
      });
      if (!existsUser) throw new NotFoundException('User not found');

      const countBorrowUser = await queryRunner.manager.findBy(Borrow, {
        userId,
      });
      if (countBorrowUser.length >= 3) {
        throw new BadRequestException('User can borrow maximum 3 books');
      }

      const book = await queryRunner.manager.findOneBy(Book, { id: bookId });
      if (!book) throw new NotFoundException('Book not found');

      const bookHistory = queryRunner.manager.create(BookHistory, {
        book,
        userId,
      });
      const newHistBook = await queryRunner.manager.save(
        BookHistory,
        bookHistory,
      );

      const borrow = queryRunner.manager.create(Borrow, createBorrowDto);
      const newBorrow = await queryRunner.manager.save(Borrow, borrow);

      await queryRunner.commitTransaction();

      return getSuccessRes({ newBorrow, bookHistory: newHistBook }, 201);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateBorrow(id: string, updateBorrowDto: UpdateBorrowDto) {
    const existsBorrow = await this.borrowRepo.findOne({ where: { id } });
    if (!existsBorrow) throw new ConflictException('Borrow not found');

    const { bookId, userId } = updateBorrowDto;

    if (bookId) await this.bookService.findOneById(bookId);
    if (userId) await this.usersService.findOneById(userId);

    await this.borrowRepo.update(id, updateBorrowDto);
    const updatedBorrow = await this.borrowRepo.findOne({ where: { id } });

    return getSuccessRes(updatedBorrow || {});
  }
}
