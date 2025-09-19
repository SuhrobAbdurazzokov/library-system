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
const users_entity_1 = require("../../core/entity/users.entity");
const book_entity_1 = require("../../core/entity/book.entity");
const book_history_entity_1 = require("../../core/entity/book-history.entity");
let BorrowService = class BorrowService extends base_service_1.BaseService {
    borrowRepo;
    dataSource;
    bookService;
    usersService;
    constructor(borrowRepo, dataSource, bookService, usersService) {
        super(borrowRepo);
        this.borrowRepo = borrowRepo;
        this.dataSource = dataSource;
        this.bookService = bookService;
        this.usersService = usersService;
    }
    async createBorrow(createBorrowDto) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { bookId, userId } = createBorrowDto;
            const existsUser = await queryRunner.manager.findOneBy(users_entity_1.Users, {
                id: userId,
            });
            if (!existsUser)
                throw new common_1.NotFoundException('User not found');
            const countBorrowUser = await queryRunner.manager.findBy(borrow_entity_1.Borrow, {
                userId,
            });
            if (countBorrowUser.length >= 3) {
                throw new common_1.BadRequestException('User can borrow maximum 3 books');
            }
            const book = await queryRunner.manager.findOneBy(book_entity_1.Book, { id: bookId });
            if (!book)
                throw new common_1.NotFoundException('Book not found');
            const bookHistory = queryRunner.manager.create(book_history_entity_1.BookHistory, {
                book,
                userId,
            });
            const newHistBook = await queryRunner.manager.save(book_history_entity_1.BookHistory, bookHistory);
            const borrow = queryRunner.manager.create(borrow_entity_1.Borrow, createBorrowDto);
            const newBorrow = await queryRunner.manager.save(borrow_entity_1.Borrow, borrow);
            await queryRunner.commitTransaction();
            return (0, get_success_res_1.getSuccessRes)({ newBorrow, bookHistory: newHistBook }, 201);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
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
    __metadata("design:paramtypes", [Object, typeorm_2.DataSource,
        book_service_1.BookService,
        users_service_1.UsersService])
], BorrowService);
//# sourceMappingURL=borrow.service.js.map