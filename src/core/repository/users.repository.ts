import { Repository } from 'typeorm';
import { Users } from '../entity/users.entity';

export type UsersRepositoy = Repository<Users>;
