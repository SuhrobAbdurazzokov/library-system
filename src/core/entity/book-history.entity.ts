import { BaseEntity } from 'src/common/database/base.entity';
import { ActionBook } from 'src/common/enum/book-history-action.enum';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';
import { Book } from './book.entity';

@Entity('book-history')
export class BookHistory extends BaseEntity {
  @Column({ type: 'enum', enum: ActionBook, nullable: true })
  action: ActionBook;

  @Column({ type: 'timestamp', nullable: true })
  date: Date;

  @ManyToOne(() => Users, (user) => user.bookHistory)
  @JoinColumn({ name: 'user' })
  user: Users;

  @ManyToOne(() => Book, (book) => book.bookHistory)
  @JoinColumn({ name: 'book' })
  book: Book;
}
