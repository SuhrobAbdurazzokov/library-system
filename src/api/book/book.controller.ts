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
  BadRequestException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Roles } from 'src/common/decorator/role.decorator';
import { UsersRole } from 'src/common/enum/users-role.enum';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { QueryDto } from 'src/common/dto/query.dto';
import { ILike } from 'typeorm';
import { QueryPaginationDto } from 'src/common/dto/pagination.dto';

@Controller('book')
@ApiBearerAuth()
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'create book' })
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
  @ApiOperation({ summary: 'find all books with filter' })
  @Get()
  async findAllWithFilter(@Query() queryDto: QueryDto) {
    const { query, search } = queryDto;

    const allowedFields = ['title', 'author'];
    if (search && !allowedFields.includes(search)) {
      throw new BadRequestException(
        `Search field "${search}" mavjud emas. Mavjud fields: ${allowedFields.join(', ')}`,
      );
    }

    let where: any = { available: true };

    if (search && query) {
      where = {
        ...where,
        [search]: ILike(`%${query}%`),
      };
    }

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
  @ApiOperation({ summary: 'find all books with pagination' })
  @Get('pagination')
  findAllWithPagination(@Query() queryDto: QueryPaginationDto) {
    const { query, page, limit } = queryDto;

    const where = query
      ? { title: ILike(`%${query}%`) }
      : {
          author: ILike(`%${query}%`),
        };

    return this.bookService.findAllWithPagination({
      where,
      order: { createdAt: 'DESC' },
      select: {
        id: true,
        title: true,
        author: true,
        publishedYear: true,
      },
      skip: page,
      take: limit,
    });
  }

  @ApiOperation({ summary: 'find top books' })
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

  @ApiOperation({ summary: 'find one books by id' })
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

  @ApiOperation({ summary: 'update book' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SUPERADMIN, UsersRole.ADMIN, UsersRole.LIBRARIAN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.update(id, updateBookDto);
  }

  @ApiOperation({ summary: 'delete book' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SUPERADMIN, UsersRole.ADMIN, UsersRole.LIBRARIAN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.delete(id);
  }
}
