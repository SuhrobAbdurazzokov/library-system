import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseService } from 'src/infrastructure/base/base.service';
import { Users } from 'src/core/entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { UsersRepositoy } from 'src/core/repository/users.repository';
import { getSuccessRes } from 'src/common/util/get-success-res';
import { UsersRole } from 'src/common/enum/users-role.enum';
import { CryptoService } from 'src/common/bcrypt/crypto';
import { config } from 'src/config';
import { SignInDto } from 'src/api/users/dto/signin.dto';
import { IToken } from 'src/infrastructure/interface/token.interface';
import { TokenService } from 'src/common/token/token';
import { Response } from 'express';
import { SignUpDto } from './dto/signup.dto';
import { Borrow } from 'src/core/entity/borrow.entity';
import type { BorrowRepository } from 'src/core/repository/borrow.repository';

@Injectable()
export class UsersService
  extends BaseService<CreateUserDto, UpdateUserDto, Users>
  implements OnModuleInit
{
  constructor(
    @InjectRepository(Users) private readonly usersRepo: UsersRepositoy,
    @InjectRepository(Borrow) private readonly borrowRepo: BorrowRepository,
    private readonly crypto: CryptoService,
    private readonly token: TokenService,
  ) {
    super(usersRepo);
  }

  async onModuleInit() {
    try {
      const existsAdmin = await this.usersRepo.findOne({
        where: { role: UsersRole.SUPERADMIN },
      });

      if (!existsAdmin) {
        const hashPassword = await this.crypto.encrypt(config.ADMIN_PASSWORD);
        const superadmin = this.usersRepo.create({
          email: config.ADMIN_EMAIL,
          fullName: config.ADMIN_FULLNAME,
          password: hashPassword,
          role: UsersRole.SUPERADMIN,
        });
        await this.usersRepo.save(superadmin);
        console.log('Super admin created');
      }
    } catch (error) {
      throw new InternalServerErrorException('Error on creating super admin');
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const existsEmail = await this.usersRepo.findOne({ where: { email } });
    if (existsEmail)
      throw new ConflictException('Email address already exists');

    const hashPassword = await this.crypto.encrypt(password);

    const user = this.usersRepo.create({
      email,
      password: hashPassword,
      role: createUserDto.role,
      fullName: createUserDto.fullName,
    });
    await this.usersRepo.save(user);
    return getSuccessRes(user, 201);
  }

  async signUp(signUpDto: SignUpDto, res: Response) {
    const { email, password } = signUpDto;
    const existsEmail = await this.usersRepo.findOne({ where: { email } });
    if (existsEmail)
      throw new ConflictException('Email address already exists');
    const hashPassword = await this.crypto.encrypt(password);

    const user = this.usersRepo.create({
      email,
      password: hashPassword,
      fullName: signUpDto.fullName,
      role: UsersRole.READER,
    });
    await this.usersRepo.save(user);

    const payload: IToken = {
      id: user.id,
      role: UsersRole.READER,
    };

    const accessToken = await this.token.accessToken(payload);
    const refreshToken = await this.token.refreshToken(payload);
    await this.token.writeToCookie(res, 'userToken', refreshToken, 15);
    return getSuccessRes({ accessToken });
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto;
    const existsUser = await this.usersRepo.findOne({ where: { id } });
    if (!existsUser) throw new NotFoundException('User not found');
    if (email) {
      const existsEmail = await this.usersRepo.findOne({ where: { email } });
      if (existsEmail && existsEmail.id !== id)
        throw new ConflictException('Email address already exists');
    }

    const user = await this.usersRepo.update(id, updateUserDto);

    const updatedUser = await this.usersRepo.findOne({ where: { id } });
    return getSuccessRes(updatedUser || {});
  }

  async login(signInDto: SignInDto, res: Response) {
    const { email, password } = signInDto;
    const existsUser = await this.usersRepo.findOne({ where: { email } });
    const isMatchPassword = await this.crypto.decrypt(
      password,
      existsUser?.password || '',
    );
    if (!existsUser || !isMatchPassword)
      throw new BadRequestException('Email or password incorrect');

    const payload: IToken = {
      id: existsUser.id,
      role: existsUser.role,
    };

    const accessToken = await this.token.accessToken(payload);
    const refreshToken = await this.token.refreshToken(payload);
    await this.token.writeToCookie(res, 'userToken', refreshToken, 15);
    return getSuccessRes({ accessToken });
  }

    async findTopUsers() {
    return this.borrowRepo
      .createQueryBuilder('borrow')
      .leftJoin('borrow.user', 'user')
      .select('user.id', 'id')
      .addSelect('user.fullName', 'fullName')
      .addSelect('COUNT(borrow.id)', 'borrowCount')
      .groupBy('user.id')
      .addGroupBy('user.fullName')
      .orderBy('"borrowCount"', 'DESC')
      .limit(5)
      .getRawMany();
  }


}
