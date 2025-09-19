import { UsersRole } from 'src/common/enum/users-role.enum';
export declare class CreateUserDto {
    fullName: string;
    email: string;
    password: string;
    role: UsersRole;
}
