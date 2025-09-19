import { BaseEntity } from 'src/common/database/base.entity';
import { Borrow } from './borrow.entity';
import { BookHistory } from './book-history.entity';
export declare class Book extends BaseEntity {
    title: string;
    author: string;
    publishedYear: number;
    available: boolean;
    borrow: Borrow[];
    bookHistory: BookHistory[];
}
