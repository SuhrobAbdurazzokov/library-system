import { Repository } from 'typeorm';
import { BookRepository } from './book.repository';

export type BookHistoryRepository = Repository<BookRepository>;
