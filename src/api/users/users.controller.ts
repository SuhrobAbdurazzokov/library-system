import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  ParseUUIDPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/role.decorator';
import { UsersRole } from 'src/common/enum/users-role.enum';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import type { Response } from 'express';
import { SignInDto } from 'src/api/users/dto/signin.dto';
import { SignUpDto } from './dto/signup.dto';
import { QueryDto } from 'src/common/dto/query.dto';
import { ILike } from 'typeorm';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN)
  @ApiBearerAuth()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('signup')
  signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.signUp(signUpDto, res);
  }

  @Post('login')
  login(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(signInDto, res);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.usersService.findAll({
      select: {
        id: true,

        fullName: true,
        email: true,
        role: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  @ApiOperation({ summary: 'find all users with filter' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN, UsersRole.LIBRARIAN)
  @Get('top-users')
  findTopUsers() {
    return this.usersService.findTopUsers();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN)
  @ApiBearerAuth()
  @Get('filter')
  findAllWithFilter(@Query() queryDto: QueryDto) {
    const { query, search } = queryDto;

    const allowedFields = ['email', 'fullName', 'role'];

    if (search && !allowedFields.includes(search)) {
      throw new BadRequestException(
        ` Search field "${search}" mavjud emas. Mavjud fields: ${allowedFields.join(', ')},`,
      );
    }

    let where = {};
    if (query && search) {
      where = {
        [search]: ILike(`%${query}%`),
      };
    }

    return this.usersService.findAll({
      where,
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN, 'ID')
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOneById(id, {
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN, 'ID')
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN, 'ID')
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
