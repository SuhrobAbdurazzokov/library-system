import { BaseEntity } from 'src/common/database/base.entity';
import { UsersRole } from 'src/common/enum/users-role.enum';
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { Borrow } from './borrow.entity';
import { BookHistory } from './book-history.entity';

@Entity('users')
export class Users extends BaseEntity {
  @Column({ type: 'varchar', nullable: true })
  fullName: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'enum', enum: UsersRole, nullable: true })
  role: UsersRole;

  @OneToMany(() => Borrow, (borrow) => borrow.user)
  @JoinColumn({ name: 'borrow' })
  borrow: Borrow;

  @OneToMany(() => BookHistory, (bookHistory) => bookHistory.user)
  @JoinColumn({ name: 'bookHistory' })
  bookHistory: BookHistory;
}
