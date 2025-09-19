import { OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { Users } from 'src/core/entity/users.entity';
import type { UsersRepositoy } from 'src/core/repository/users.repository';
import { CryptoService } from 'src/common/bcrypt/crypto';
import { SignInDto } from 'src/api/users/dto/signin.dto';
import { TokenService } from 'src/common/token/token';
import { Response } from 'express';
import { SignUpDto } from './dto/signup.dto';
import type { BorrowRepository } from 'src/core/repository/borrow.repository';
import { QueryDto } from 'src/common/dto/query.dto';
export declare class UsersService extends BaseService<CreateUserDto, UpdateUserDto, Users> implements OnModuleInit {
    private readonly usersRepo;
    private readonly borrowRepo;
    private readonly crypto;
    private readonly token;
    constructor(usersRepo: UsersRepositoy, borrowRepo: BorrowRepository, crypto: CryptoService, token: TokenService);
    onModuleInit(): Promise<void>;
    createUser(createUserDto: CreateUserDto): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    signUp(signUpDto: SignUpDto, res: Response): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    login(signInDto: SignInDto, res: Response): Promise<import("../../infrastructure/interface/resonse.interface").IResponse>;
    findAllWithRoleFilter(currentUser: Users, queryDto?: QueryDto): Promise<Users[]>;
    findTopUsers(): Promise<any[]>;
}
