import { BaseEntity } from 'src/common/database/base.entity';
import { Users } from './users.entity';
import { Book } from './book.entity';
export declare class Borrow extends BaseEntity {
    borrowDate: Date;
    dueDate: Date;
    returnDate: Date;
    overdue: boolean;
    userId: string;
    user: Users;
    bookId: string;
    book: Book;
}
