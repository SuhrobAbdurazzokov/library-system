import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { QueryDto } from 'src/common/dto/query.dto';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    create(createBookDto: CreateBookDto): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    findAllWithFilter(queryDto: QueryDto): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    findAll(): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    findTopBooks(): Promise<any[]>;
    findOne(id: string): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    remove(id: string): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
}
