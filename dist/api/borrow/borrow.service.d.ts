import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { Borrow } from 'src/core/entity/borrow.entity';
import type { BorrowRepository } from 'src/core/repository/borrow.repository';
import { BookService } from '../book/book.service';
import { UsersService } from '../users/users.service';
import { DataSource } from 'typeorm';
import { Users } from 'src/core/entity/users.entity';
import { BookHistory } from 'src/core/entity/book-history.entity';
import type { BookRepository } from 'src/core/repository/book.repository';
export declare class BorrowService extends BaseService<CreateBorrowDto, UpdateBorrowDto, Borrow> {
    private readonly borrowRepo;
    private readonly dataSource;
    private readonly bookService;
    private readonly usersService;
    private readonly bookRepo;
    private readonly book;
    constructor(borrowRepo: BorrowRepository, dataSource: DataSource, bookService: BookService, usersService: UsersService, bookRepo: BookRepository, book: BookRepository);
    createBorrow(bookId: string, user: Users): Promise<Borrow>;
    returnBorrow(borrowId: string): Promise<{
        message: string;
        borrow: Borrow;
        history: BookHistory;
    }>;
    findMyBorrows(user: Users): Promise<Borrow[]>;
    updateBorrow(id: string, updateBorrowDto: UpdateBorrowDto): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
}
