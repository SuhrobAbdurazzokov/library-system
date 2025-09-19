import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { Book } from 'src/core/entity/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { BookRepository } from 'src/core/repository/book.repository';

@Injectable()
export class BookService extends BaseService<
  CreateBookDto,
  UpdateBookDto,
  Book
> {
  constructor(
    @InjectRepository(Book) private readonly bookRepo: BookRepository,
  ) {
    super(bookRepo);
  }

  async findTopBooks() {
    return this.bookRepo
      .createQueryBuilder('book')
      .leftJoin('book.borrow', 'borrow')
      .select('book.id', 'id')
      .addSelect('book.title', 'title')
      .addSelect('COUNT(borrow.id)', 'borrowCount')
      .groupBy('book.id')
      .addGroupBy('book.title')
      .orderBy('"borrowCount"', 'DESC')
      .limit(5)
      .getRawMany();
  }
}
