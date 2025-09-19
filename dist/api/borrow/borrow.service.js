"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../infrastructure/base/base.service");
const borrow_entity_1 = require("../../core/entity/borrow.entity");
const typeorm_1 = require("@nestjs/typeorm");
const book_service_1 = require("../book/book.service");
const users_service_1 = require("../users/users.service");
const get_success_res_1 = require("../../common/util/get-success-res");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("../../core/entity/book.entity");
const book_history_entity_1 = require("../../core/entity/book-history.entity");
const book_history_action_enum_1 = require("../../common/enum/book-history-action.enum");
let BorrowService = class BorrowService extends base_service_1.BaseService {
    borrowRepo;
    dataSource;
    bookService;
    usersService;
    bookRepo;
    book;
    constructor(borrowRepo, dataSource, bookService, usersService, bookRepo, book) {
        super(borrowRepo);
        this.borrowRepo = borrowRepo;
        this.dataSource = dataSource;
        this.bookService = bookService;
        this.usersService = usersService;
        this.bookRepo = bookRepo;
        this.book = book;
    }
    async createBorrow(bookId, user) {
        const book = await this.bookRepo.findOne({ where: { id: bookId } });
        if (!book)
            throw new common_1.NotFoundException('Book not found');
        if (!book.available)
            throw new common_1.BadRequestException('book already borrowed');
        const activeBorrows = await this.borrowRepo.count({
            where: { user: { id: user.id }, returnDate: (0, typeorm_2.IsNull)() },
        });
        if (activeBorrows >= 3) {
            throw new common_1.BadRequestException('you are max 3 book borrow');
        }
        return await this.dataSource.transaction(async (manager) => {
            const borrow = manager.create(borrow_entity_1.Borrow, {
                user,
                book,
                borrowDate: new Date(),
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });
            await manager.save(borrow);
            book.available = false;
            await manager.save(book);
            const history = manager.create(book_history_entity_1.BookHistory, {
                user,
                book,
                action: book_history_action_enum_1.ActionBook.BORROW,
                date: new Date(),
            });
            await manager.save(history);
            return borrow;
        });
    }
    async returnBorrow(borrowId) {
        return this.dataSource.transaction(async (manager) => {
            const borrow = await manager.getRepository(borrow_entity_1.Borrow).findOne({
                where: { id: borrowId },
                relations: ['book', 'user'],
            });
            if (!borrow)
                throw new common_1.NotFoundException('Borrow record not found');
            const now = new Date();
            borrow.returnDate = now;
            borrow.overdue = borrow.dueDate < now;
            borrow.book.available = true;
            await manager.getRepository(borrow_entity_1.Borrow).save(borrow);
            await manager.getRepository(book_entity_1.Book).save(borrow.book);
            const history = manager.getRepository(book_history_entity_1.BookHistory).create({
                user: borrow.user,
                book: borrow.book,
                action: book_history_action_enum_1.ActionBook.RETURN,
            });
            await manager.getRepository(book_history_entity_1.BookHistory).save(history);
            return {
                message: 'Book returned successfully',
                borrow,
                history,
            };
        });
    }
    async findMyBorrows(user) {
        return this.borrowRepo.find({
            where: { user: { id: user.id } },
            relations: ['book'],
            order: { borrowDate: 'DESC' },
        });
    }
    async updateBorrow(id, updateBorrowDto) {
        const existsBorrow = await this.borrowRepo.findOne({ where: { id } });
        if (!existsBorrow)
            throw new common_1.ConflictException('Borrow not found');
        const { bookId, userId } = updateBorrowDto;
        if (bookId)
            await this.bookService.findOneById(bookId);
        if (userId)
            await this.usersService.findOneById(userId);
        await this.borrowRepo.update(id, updateBorrowDto);
        const updatedBorrow = await this.borrowRepo.findOne({ where: { id } });
        return (0, get_success_res_1.getSuccessRes)(updatedBorrow || {});
    }
};
exports.BorrowService = BorrowService;
exports.BorrowService = BorrowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(borrow_entity_1.Borrow)),
    __param(4, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __param(5, (0, typeorm_1.InjectRepository)(book_history_entity_1.BookHistory)),
    __metadata("design:paramtypes", [Object, typeorm_2.DataSource,
        book_service_1.BookService,
        users_service_1.UsersService, Object, Object])
], BorrowService);
//# sourceMappingURL=borrow.service.js.map