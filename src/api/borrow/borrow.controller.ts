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
  Req,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { CreateBorrowDto } from './dto/create-borrow.dto';
import { UpdateBorrowDto } from './dto/update-borrow.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/common/decorator/role.decorator';
import { UsersRole } from 'src/common/enum/users-role.enum';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { Users } from 'src/core/entity/users.entity';

@Controller('borrow')
@ApiBearerAuth()
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @ApiOperation({ summary: 'create borrow' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(
    UsersRole.SUPERADMIN,
    UsersRole.ADMIN,
    UsersRole.LIBRARIAN,
    UsersRole.READER,
  )
  @Post(':bookId')
  borrowBook(@Param('bookId') bookId: string, @Req() req: any) {
    const user: Users = req.user;
    return this.borrowService.createBorrow(bookId, user);
  }

  @ApiOperation({ summary: 'return borrow' })
  @Patch(':id/return')
  returnBook(@Param('id') id: string, @Req() req: any) {
    const user: Users = req.user;
    return this.borrowService.returnBorrow(id);
  }
  @ApiOperation({ summary: 'find all borrow' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SUPERADMIN, UsersRole.ADMIN, UsersRole.LIBRARIAN)
  @Get()
  findAll() {
    return this.borrowService.findAll();
  }

  @UseGuards(RolesGuard, AuthGuard)
  @Roles(
    UsersRole.SUPERADMIN,
    UsersRole.ADMIN,
    UsersRole.LIBRARIAN,
    UsersRole.LIBRARIAN,
    'ID',
  )
  @ApiOperation({ summary: 'my borrow' })
  @Get('my')
  findMyBorrows(@Req() req: any) {
    const user: Users = req.user;
    return this.borrowService.findMyBorrows(user);
  }

  @ApiOperation({ summary: 'find one borrow by id' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SUPERADMIN, UsersRole.ADMIN, UsersRole.LIBRARIAN, 'ID')
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.borrowService.findOneById(id);
  }

  @ApiOperation({ summary: 'update borrow' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SUPERADMIN, UsersRole.ADMIN, UsersRole.LIBRARIAN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBorrowDto: UpdateBorrowDto,
  ) {
    return this.borrowService.updateBorrow(id, updateBorrowDto);
  }

  @ApiOperation({ summary: 'delete borrow' })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UsersRole.SUPERADMIN, UsersRole.ADMIN, UsersRole.LIBRARIAN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.borrowService.delete(id);
  }
}
