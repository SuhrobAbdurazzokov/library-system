import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { Book } from 'src/core/entity/book.entity';
import type { BookRepository } from 'src/core/repository/book.repository';
export declare class BookService extends BaseService<CreateBookDto, UpdateBookDto, Book> {
    private readonly bookRepo;
    constructor(bookRepo: BookRepository);
    findTopBooks(): Promise<any[]>;
}
