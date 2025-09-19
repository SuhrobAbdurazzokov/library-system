import { BorrowService } from './borrow.service';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
export declare class BorrowController {
    private readonly borrowService;
    constructor(borrowService: BorrowService);
    borrowBook(bookId: string, req: any): Promise<import("../../core/entity/borrow.entity").Borrow>;
    returnBook(id: string, req: any): Promise<{
        message: string;
        borrow: import("../../core/entity/borrow.entity").Borrow;
        history: import("../../core/entity/book-history.entity").BookHistory;
    }>;
    findAll(): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    findMyBorrows(req: any): Promise<import("../../core/entity/borrow.entity").Borrow[]>;
    findOne(id: string): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    update(id: string, updateBorrowDto: UpdateBorrowDto): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    remove(id: string): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
}
