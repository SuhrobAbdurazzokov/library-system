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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const base_entity_1 = require("../../common/database/base.entity");
const users_role_enum_1 = require("../../common/enum/users-role.enum");
const typeorm_1 = require("typeorm");
const borrow_entity_1 = require("./borrow.entity");
const book_history_entity_1 = require("./book-history.entity");
let Users = class Users extends base_entity_1.BaseEntity {
    fullName;
    email;
    password;
    role;
    borrow;
    bookHistory;
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: users_role_enum_1.UsersRole, nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => borrow_entity_1.Borrow, (borrow) => borrow.user),
    (0, typeorm_1.JoinColumn)({ name: 'borrow' }),
    __metadata("design:type", borrow_entity_1.Borrow)
], Users.prototype, "borrow", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => book_history_entity_1.BookHistory, (bookHistory) => bookHistory.user),
    (0, typeorm_1.JoinColumn)({ name: 'bookHistory' }),
    __metadata("design:type", book_history_entity_1.BookHistory)
], Users.prototype, "bookHistory", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)('users')
], Users);
//# sourceMappingURL=users.entity.js.map