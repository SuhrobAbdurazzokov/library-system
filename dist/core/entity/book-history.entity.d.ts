import { BaseEntity } from 'src/common/database/base.entity';
import { ActionBook } from 'src/common/enum/book-history-action.enum';
import { Users } from './users.entity';
import { Book } from './book.entity';
export declare class BookHistory extends BaseEntity {
    action: ActionBook;
    date: Date;
    user: Users;
    book: Book;
}
