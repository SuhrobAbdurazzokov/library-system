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
exports.BorrowController = void 0;
const common_1 = require("@nestjs/common");
const borrow_service_1 = require("./borrow.service");
const create_borrow_dto_1 = require("./dto/create-borrow.dto");
const update_borrow_dto_1 = require("./dto/update-borrow.dto");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../../common/decorator/role.decorator");
const users_role_enum_1 = require("../../common/enum/users-role.enum");
const auth_guard_1 = require("../../common/guard/auth.guard");
const roles_guard_1 = require("../../common/guard/roles.guard");
let BorrowController = class BorrowController {
    borrowService;
    constructor(borrowService) {
        this.borrowService = borrowService;
    }
    create(createBorrowDto) {
        return this.borrowService.createBorrow(createBorrowDto);
    }
    findAll() {
        return this.borrowService.findAll();
    }
    findOne(id) {
        return this.borrowService.findOneById(id);
    }
    update(id, updateBorrowDto) {
        return this.borrowService.updateBorrow(id, updateBorrowDto);
    }
    remove(id) {
        return this.borrowService.delete(id);
    }
};
exports.BorrowController = BorrowController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.SUPERADMIN, users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.LIBRARIAN, users_role_enum_1.UsersRole.READER),
    (0, common_1.Post)(''),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_borrow_dto_1.CreateBorrowDto]),
    __metadata("design:returntype", void 0)
], BorrowController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.SUPERADMIN, users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.LIBRARIAN),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BorrowController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.SUPERADMIN, users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.LIBRARIAN, 'ID'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BorrowController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.SUPERADMIN, users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.LIBRARIAN),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_borrow_dto_1.UpdateBorrowDto]),
    __metadata("design:returntype", void 0)
], BorrowController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.SUPERADMIN, users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.LIBRARIAN),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BorrowController.prototype, "remove", null);
exports.BorrowController = BorrowController = __decorate([
    (0, common_1.Controller)('borrow'),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [borrow_service_1.BorrowService])
], BorrowController);
//# sourceMappingURL=borrow.controller.js.map