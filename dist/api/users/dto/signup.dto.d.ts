import { UsersRole } from 'src/common/enum/users-role.enum';
export declare class SignUpDto {
    fullName: string;
    email: string;
    password: string;
    role: UsersRole.READER;
}
