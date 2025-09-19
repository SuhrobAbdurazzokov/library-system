import { BaseEntity } from 'src/common/database/base.entity';
import { UsersRole } from 'src/common/enum/users-role.enum';
import { Borrow } from './borrow.entity';
import { BookHistory } from './book-history.entity';
export declare class Users extends BaseEntity {
    fullName: string;
    email: string;
    password: string;
    role: UsersRole;
    borrow: Borrow;
    bookHistory: BookHistory;
}
