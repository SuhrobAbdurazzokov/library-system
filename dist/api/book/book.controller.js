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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const create_book_dto_1 = require("./dto/create-book.dto");
const update_book_dto_1 = require("./dto/update-book.dto");
const role_decorator_1 = require("../../common/decorator/role.decorator");
const users_role_enum_1 = require("../../common/enum/users-role.enum");
const auth_guard_1 = require("../../common/guard/auth.guard");
const roles_guard_1 = require("../../common/guard/roles.guard");
const swagger_1 = require("@nestjs/swagger");
const query_dto_1 = require("../../common/dto/query.dto");
const typeorm_1 = require("typeorm");
let BookController = class BookController {
    bookService;
    constructor(bookService) {
        this.bookService = bookService;
    }
    create(createBookDto) {
        return this.bookService.create(createBookDto);
    }
    findAllWithFilter(queryDto) {
        const { query, search } = queryDto;
        const where = query
            ? {
                [search]: (0, typeorm_1.ILike)(`%${query}%`),
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
    findTopBooks() {
        return this.bookService.findTopBooks();
    }
    findOne(id) {
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
    update(id, updateBookDto) {
        return this.bookService.update(id, updateBookDto);
    }
    remove(id) {
        return this.bookService.delete(id);
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.SUPERADMIN, users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.LIBRARIAN),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_book_dto_1.CreateBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.SUPERADMIN, users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.LIBRARIAN, users_role_enum_1.UsersRole.READER),
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [query_dto_1.QueryDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findAllWithFilter", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.SUPERADMIN, users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.LIBRARIAN, users_role_enum_1.UsersRole.READER),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.SUPERADMIN, users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.LIBRARIAN, users_role_enum_1.UsersRole.READER),
    (0, common_1.Get)('stats/top-books'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findTopBooks", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.SUPERADMIN, users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.LIBRARIAN, users_role_enum_1.UsersRole.READER),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.SUPERADMIN, users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.LIBRARIAN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_book_dto_1.UpdateBookDto]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.SUPERADMIN, users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.LIBRARIAN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BookController.prototype, "remove", null);
exports.BookController = BookController = __decorate([
    (0, common_1.Controller)('book'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
//# sourceMappingURL=book.controller.js.map