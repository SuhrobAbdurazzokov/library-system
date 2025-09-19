import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Response } from 'express';
import { SignInDto } from 'src/api/users/dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { QueryDto } from 'src/common/dto/query.dto';
import { Users } from 'src/core/entity/users.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    signUp(signUpDto: SignUpDto, res: Response): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    login(signInDto: SignInDto, res: Response): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    findAllWithRoleFilter(req: any, queryDto: QueryDto): Promise<Users[]>;
    findTopUser(): Promise<any[]>;
    findOne(id: string): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    remove(id: string): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
}
