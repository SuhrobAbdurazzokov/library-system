import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
export declare class BorrowController {
    private readonly borrowService;
    constructor(borrowService: BorrowService);
    create(createBorrowDto: CreateBorrowDto): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    findAll(): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    findOne(id: string): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    update(id: string, updateBorrowDto: UpdateBorrowDto): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    remove(id: string): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
}
