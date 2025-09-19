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
import { DataSource, IsNull } from 'typeorm';
import { Users } from 'src/core/entity/users.entity';
import { Book } from 'src/core/entity/book.entity';
import { BookHistory } from 'src/core/entity/book-history.entity';
import type { BookRepository } from 'src/core/repository/book.repository';
import { ActionBook } from 'src/common/enum/book-history-action.enum';

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
    @InjectRepository(Book) private readonly bookRepo: BookRepository,
    @InjectRepository(BookHistory) private readonly book: BookRepository,
  ) {
    super(borrowRepo);
  }

  async createBorrow(bookId: string, user: Users) {
    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (!book) throw new NotFoundException('Book not found');
    if (!book.available) throw new BadRequestException('book already borrowed');

    const activeBorrows = await this.borrowRepo.count({
      where: { user: { id: user.id }, returnDate: IsNull() },
    });
    if (activeBorrows >= 3) {
      throw new BadRequestException('you are max 3 book borrow');
    }

    return await this.dataSource.transaction(async (manager) => {
      const borrow = manager.create(Borrow, {
        user,
        book,
        borrowDate: new Date(),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      await manager.save(borrow);

      book.available = false;
      await manager.save(book);

      const history = manager.create(BookHistory, {
        user,
        book,
        action: ActionBook.BORROW,
        date: new Date(),
      });
      await manager.save(history);

      return borrow;
    });
  }

  async returnBorrow(borrowId: string) {
    return this.dataSource.transaction(async (manager) => {
      const borrow = await manager.getRepository(Borrow).findOne({
        where: { id: borrowId },
        relations: ['book', 'user'],
      });
      if (!borrow) throw new NotFoundException('Borrow record not found');

      const now = new Date();
      borrow.returnDate = now;
      borrow.overdue = borrow.dueDate < now;

      borrow.book.available = true;

      await manager.getRepository(Borrow).save(borrow);
      await manager.getRepository(Book).save(borrow.book);

      const history = manager.getRepository(BookHistory).create({
        user: borrow.user,
        book: borrow.book,
        action: ActionBook.RETURN,
      });
      await manager.getRepository(BookHistory).save(history);

      return {
        message: 'Book returned successfully',
        borrow,
        history,
      };
    });
  }

  async findMyBorrows(user: Users) {
    return this.borrowRepo.find({
      where: { user: { id: user.id } },
      relations: ['book'],
      order: { borrowDate: 'DESC' },
    });
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
