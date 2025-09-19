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
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/role.decorator';
import { UsersRole } from 'src/common/enum/users-role.enum';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';

@Controller('borrow')
@ApiBearerAuth()
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    UsersRole.SUPERADMIN,
    UsersRole.ADMIN,
    UsersRole.LIBRARIAN,
    UsersRole.READER,
  )
  @Post('')
  create(@Body() createBorrowDto: CreateBorrowDto) {
    return this.borrowService.createBorrow(createBorrowDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SUPERADMIN, UsersRole.ADMIN, UsersRole.LIBRARIAN)
  @Get()
  findAll() {
    return this.borrowService.findAll();
  }


  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SUPERADMIN, UsersRole.ADMIN, UsersRole.LIBRARIAN, 'ID')
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.borrowService.findOneById(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SUPERADMIN, UsersRole.ADMIN, UsersRole.LIBRARIAN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBorrowDto: UpdateBorrowDto,
  ) {
    return this.borrowService.updateBorrow(id, updateBorrowDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SUPERADMIN, UsersRole.ADMIN, UsersRole.LIBRARIAN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.borrowService.delete(id);
  }
}
