import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { UsersRole } from 'src/common/enum/users-role.enum';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { QueryDto } from 'src/common/dto/query.dto';
import { ILike } from 'typeorm';

@Controller('book')
@ApiBearerAuth()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SUPERADMIN, UsersRole.ADMIN, UsersRole.LIBRARIAN)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    UsersRole.SUPERADMIN,
    UsersRole.ADMIN,
    UsersRole.LIBRARIAN,
    UsersRole.READER,
  )
  @Get('filter')
  findAllWithFilter(@Query() queryDto: QueryDto) {
    const { query, search } = queryDto;

    const where = query
      ? {
          [search]: ILike(`%${query}%`),
          available: true,
        }
      : {
          available: true,
        };

    return this.bookService.findAll({
      where,
      select: {
        id: true,
        title: true,
        author: true,
        publishedYear: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    UsersRole.SUPERADMIN,
    UsersRole.ADMIN,
    UsersRole.LIBRARIAN,
    UsersRole.READER,
  )
  @Get()
  findAll() {
    return this.bookService.findAll({
      where: { available: true },
      select: {
        id: true,
        title: true,
        author: true,
        publishedYear: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    UsersRole.SUPERADMIN,
    UsersRole.ADMIN,
    UsersRole.LIBRARIAN,
    UsersRole.READER,
  )
  @Get('stats/top-books')
  findTopBooks() {
    return this.bookService.findTopBooks();
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    UsersRole.SUPERADMIN,
    UsersRole.ADMIN,
    UsersRole.LIBRARIAN,
    UsersRole.READER,
  )
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.findOneById(id, {
      select: {
        id: true,
        title: true,
        author: true,
        publishedYear: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SUPERADMIN, UsersRole.ADMIN, UsersRole.LIBRARIAN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.update(id, updateBookDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SUPERADMIN, UsersRole.ADMIN, UsersRole.LIBRARIAN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.delete(id);
  }
}
