import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { Borrow } from 'src/core/entity/borrow.entity';
import type { BorrowRepository } from 'src/core/repository/borrow.repository';
import { BookService } from '../book/book.service';
import { UsersService } from '../users/users.service';
import { DataSource } from 'typeorm';
export declare class BorrowService extends BaseService<CreateBorrowDto, UpdateBorrowDto, Borrow> {
    private readonly borrowRepo;
    private readonly dataSource;
    private readonly bookService;
    private readonly usersService;
    constructor(borrowRepo: BorrowRepository, dataSource: DataSource, bookService: BookService, usersService: UsersService);
    createBorrow(createBorrowDto: CreateBorrowDto): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    updateBorrow(id: string, updateBorrowDto: UpdateBorrowDto): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
}
