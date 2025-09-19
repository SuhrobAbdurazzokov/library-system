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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const role_decorator_1 = require("../../common/decorator/role.decorator");
const users_role_enum_1 = require("../../common/enum/users-role.enum");
const auth_guard_1 = require("../../common/guard/auth.guard");
const roles_guard_1 = require("../../common/guard/roles.guard");
const signin_dto_1 = require("./dto/signin.dto");
const signup_dto_1 = require("./dto/signup.dto");
const query_dto_1 = require("../../common/dto/query.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    signUp(signUpDto, res) {
        return this.usersService.signUp(signUpDto, res);
    }
    login(signInDto, res) {
        return this.usersService.login(signInDto, res);
    }
    async findAllWithRoleFilter(req, queryDto) {
        const currentUser = req.user;
        return this.usersService.findAllWithRoleFilter(currentUser, queryDto);
    }
    findTopUser() {
        return this.usersService.findTopUsers();
    }
    findOne(id) {
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
    update(id, updateUserDto) {
        return this.usersService.updateUser(id, updateUserDto);
    }
    remove(id) {
        return this.usersService.delete(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'create admin and librarian' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'signup (register) for reader' }),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignUpDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'login users' }),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_dto_1.SignInDto, Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'find all users with filter' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.SUPERADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_dto_1.QueryDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllWithRoleFilter", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'find top users' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.SUPERADMIN, users_role_enum_1.UsersRole.LIBRARIAN, 'ID'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('stats/top-users'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findTopUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'find one user by id' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.SUPERADMIN, 'ID'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'update user' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.SUPERADMIN, 'ID'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'delete user' }),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, role_decorator_1.Roles)(users_role_enum_1.UsersRole.ADMIN, users_role_enum_1.UsersRole.SUPERADMIN, 'ID'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map