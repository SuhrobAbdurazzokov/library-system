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
exports.BookHistory = void 0;
const base_entity_1 = require("../../common/database/base.entity");
const book_history_action_enum_1 = require("../../common/enum/book-history-action.enum");
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
const book_entity_1 = require("./book.entity");
let BookHistory = class BookHistory extends base_entity_1.BaseEntity {
    action;
    date;
    user;
    book;
};
exports.BookHistory = BookHistory;
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: book_history_action_enum_1.ActionBook, nullable: true }),
    __metadata("design:type", String)
], BookHistory.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], BookHistory.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, (user) => user.bookHistory),
    (0, typeorm_1.JoinColumn)({ name: 'user' }),
    __metadata("design:type", users_entity_1.Users)
], BookHistory.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => book_entity_1.Book, (book) => book.bookHistory),
    (0, typeorm_1.JoinColumn)({ name: 'book' }),
    __metadata("design:type", book_entity_1.Book)
], BookHistory.prototype, "book", void 0);
exports.BookHistory = BookHistory = __decorate([
    (0, typeorm_1.Entity)('book-history')
], BookHistory);
//# sourceMappingURL=book-history.entity.js.map