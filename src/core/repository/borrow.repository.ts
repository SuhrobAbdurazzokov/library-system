import { Repository } from 'typeorm';
import { Borrow } from '../entity/borrow.entity';

export type BorrowRepository = Repository<Borrow>;
