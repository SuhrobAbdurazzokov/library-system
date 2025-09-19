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
  Req,
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
import { Users } from 'src/core/entity/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'create admin and librarian' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN)
  @ApiBearerAuth()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @ApiOperation({ summary: 'signup (register) for reader' })
  @Post('signup')
  signUp(
    @Body() signUpDto: SignUpDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.signUp(signUpDto, res);
  }

  @ApiOperation({ summary: 'login users' })
  @Post('login')
  login(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(signInDto, res);
  }

  @ApiOperation({ summary: 'find all users with filter' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN)
  @ApiBearerAuth()
  @Get()
  async findAllWithRoleFilter(@Req() req: any, @Query() queryDto: QueryDto) {
    const currentUser = req.user as Users;
    return this.usersService.findAllWithRoleFilter(currentUser, queryDto);
  }

  @ApiOperation({ summary: 'find top users' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN, UsersRole.LIBRARIAN, 'ID')
  @ApiBearerAuth()
  @Get('stats/top-users')
  findTopUser() {
    return this.usersService.findTopUsers();
  }

  @ApiOperation({ summary: 'find one user by id' })
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

  @ApiOperation({ summary: 'update user' })
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

  @ApiOperation({ summary: 'delete user' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.ADMIN, UsersRole.SUPERADMIN, 'ID')
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.delete(id);
  }
}
