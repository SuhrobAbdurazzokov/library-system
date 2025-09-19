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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const base_service_1 = require("../../infrastructure/base/base.service");
const users_entity_1 = require("../../core/entity/users.entity");
const typeorm_1 = require("@nestjs/typeorm");
const get_success_res_1 = require("../../common/util/get-success-res");
const users_role_enum_1 = require("../../common/enum/users-role.enum");
const crypto_1 = require("../../common/bcrypt/crypto");
const config_1 = require("../../config");
const token_1 = require("../../common/token/token");
const borrow_entity_1 = require("../../core/entity/borrow.entity");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService extends base_service_1.BaseService {
    usersRepo;
    borrowRepo;
    crypto;
    token;
    constructor(usersRepo, borrowRepo, crypto, token) {
        super(usersRepo);
        this.usersRepo = usersRepo;
        this.borrowRepo = borrowRepo;
        this.crypto = crypto;
        this.token = token;
    }
    async onModuleInit() {
        try {
            const existsAdmin = await this.usersRepo.findOne({
                where: { role: users_role_enum_1.UsersRole.SUPERADMIN },
            });
            if (!existsAdmin) {
                const hashPassword = await this.crypto.encrypt(config_1.config.ADMIN_PASSWORD);
                const superadmin = this.usersRepo.create({
                    email: config_1.config.ADMIN_EMAIL,
                    fullName: config_1.config.ADMIN_FULLNAME,
                    password: hashPassword,
                    role: users_role_enum_1.UsersRole.SUPERADMIN,
                });
                await this.usersRepo.save(superadmin);
                console.log('Super admin created');
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error on creating super admin');
        }
    }
    async createUser(createUserDto) {
        const { email, password } = createUserDto;
        const existsEmail = await this.usersRepo.findOne({ where: { email } });
        if (existsEmail)
            throw new common_1.ConflictException('Email address already exists');
        const hashPassword = await this.crypto.encrypt(password);
        const user = this.usersRepo.create({
            email,
            password: hashPassword,
            role: createUserDto.role,
            fullName: createUserDto.fullName,
        });
        await this.usersRepo.save(user);
        return (0, get_success_res_1.getSuccessRes)(user, 201);
    }
    async signUp(signUpDto, res) {
        const { email, password } = signUpDto;
        const existsEmail = await this.usersRepo.findOne({ where: { email } });
        if (existsEmail)
            throw new common_1.ConflictException('Email address already exists');
        const hashPassword = await this.crypto.encrypt(password);
        const user = this.usersRepo.create({
            email,
            password: hashPassword,
            fullName: signUpDto.fullName,
            role: users_role_enum_1.UsersRole.READER,
        });
        await this.usersRepo.save(user);
        const payload = {
            id: user.id,
            role: users_role_enum_1.UsersRole.READER,
        };
        const accessToken = await this.token.accessToken(payload);
        const refreshToken = await this.token.refreshToken(payload);
        await this.token.writeToCookie(res, 'userToken', refreshToken, 15);
        return (0, get_success_res_1.getSuccessRes)({ accessToken });
    }
    async updateUser(id, updateUserDto) {
        const { email } = updateUserDto;
        const existsUser = await this.usersRepo.findOne({ where: { id } });
        if (!existsUser)
            throw new common_1.NotFoundException('User not found');
        if (email) {
            const existsEmail = await this.usersRepo.findOne({ where: { email } });
            if (existsEmail && existsEmail.id !== id)
                throw new common_1.ConflictException('Email address already exists');
        }
        const user = await this.usersRepo.update(id, updateUserDto);
        const updatedUser = await this.usersRepo.findOne({ where: { id } });
        return (0, get_success_res_1.getSuccessRes)(updatedUser || {});
    }
    async login(signInDto, res) {
        const { email, password } = signInDto;
        const existsUser = await this.usersRepo.findOne({ where: { email } });
        const isMatchPassword = await this.crypto.decrypt(password, existsUser?.password || '');
        if (!existsUser || !isMatchPassword)
            throw new common_1.BadRequestException('Email or password incorrect');
        const payload = {
            id: existsUser.id,
            role: existsUser.role,
        };
        const accessToken = await this.token.accessToken(payload);
        const refreshToken = await this.token.refreshToken(payload);
        await this.token.writeToCookie(res, 'userToken', refreshToken, 15);
        return (0, get_success_res_1.getSuccessRes)({ accessToken });
    }
    async findAllWithRoleFilter(currentUser, queryDto) {
        const { query, search } = queryDto || {};
        const allowedFields = ['email', 'fullName', 'role'];
        if (search && !allowedFields.includes(search)) {
            throw new common_1.BadRequestException(`Search field "${search}" mavjud emas. Mavajud fiedls: ${allowedFields.join(', ')}`);
        }
        let where = {};
        if (currentUser.role === users_role_enum_1.UsersRole.SUPERADMIN) {
        }
        else if (currentUser.role === users_role_enum_1.UsersRole.ADMIN) {
            where.role = users_role_enum_1.UsersRole.LIBRARIAN;
        }
        else if (currentUser.role === users_role_enum_1.UsersRole.LIBRARIAN) {
            where.role = users_role_enum_1.UsersRole.READER;
        }
        if (query && search) {
            if (search === 'role') {
                const normalizedRole = query.toUpperCase();
                if (!Object.values(users_role_enum_1.UsersRole).includes(normalizedRole)) {
                    throw new common_1.BadRequestException(`Bunday role "${query}" mavjud emas. Mavjud fields: ${Object.values(users_role_enum_1.UsersRole).join(', ')}`);
                }
                where = {
                    ...where,
                    role: normalizedRole,
                };
            }
            else {
                where = {
                    ...where,
                    [search]: (0, typeorm_2.ILike)(`%${query}%`),
                };
            }
        }
        return this.usersRepo.find({
            where,
            select: {
                id: true,
                fullName: true,
                email: true,
                role: true,
            },
            order: { createdAt: 'DESC' },
        });
    }
    async findTopUsers() {
        return this.borrowRepo
            .createQueryBuilder('borrow')
            .leftJoin('borrow.user', 'user')
            .select('user.id', 'id')
            .addSelect('user.fullName', 'fullName')
            .addSelect('COUNT(borrow.id)', 'borrowCount')
            .groupBy('user.id')
            .addGroupBy('user.fullName')
            .orderBy('"borrowCount"', 'DESC')
            .limit(5)
            .getRawMany();
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __param(1, (0, typeorm_1.InjectRepository)(borrow_entity_1.Borrow)),
    __metadata("design:paramtypes", [Object, Object, crypto_1.CryptoService,
        token_1.TokenService])
], UsersService);
//# sourceMappingURL=users.service.js.map