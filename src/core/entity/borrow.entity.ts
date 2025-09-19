import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';
import { Book } from './book.entity';

@Entity('borrow')
export class Borrow extends BaseEntity {
  @Column({ type: 'timestamp' })
  borrowDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  dueDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  returnDate: Date;

  @Column({ type: 'boolean', default: false })
  overdue: boolean;

  @Column({ type: 'uuid' })
  userId: string;

  @ManyToOne(() => Users, (user) => user.borrow, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column({ type: 'uuid' })
  bookId: string;

  @ManyToOne(() => Book, (book) => book.borrow, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
