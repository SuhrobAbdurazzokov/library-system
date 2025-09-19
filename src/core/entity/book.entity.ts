import { BaseEntity } from 'src/common/database/base.entity';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Borrow } from './borrow.entity';
import { BookHistory } from './book-history.entity';

@Entity('book')
export class Book extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  author: string;

  @Column({ type: 'integer', nullable: false })
  publishedYear: number;

  @Column({ type: 'boolean', default: true })
  available: boolean;

  @OneToMany(() => Borrow, (borrow) => borrow.book)
  @JoinColumn({ name: 'borrow' })
  borrow: Borrow[];

  @OneToMany(() => BookHistory, (bookHistory) => bookHistory.book)
  @JoinColumn({ name: 'bookHistory' })
  bookHistory: BookHistory[];
}
