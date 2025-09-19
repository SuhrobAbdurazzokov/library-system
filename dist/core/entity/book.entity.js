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
exports.Book = void 0;
const base_entity_1 = require("../../common/database/base.entity");
const typeorm_1 = require("typeorm");
const borrow_entity_1 = require("./borrow.entity");
const book_history_entity_1 = require("./book-history.entity");
let Book = class Book extends base_entity_1.BaseEntity {
    title;
    author;
    publishedYear;
    available;
    borrow;
    bookHistory;
};
exports.Book = Book;
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', nullable: false }),
    __metadata("design:type", Number)
], Book.prototype, "publishedYear", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Book.prototype, "available", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => borrow_entity_1.Borrow, (borrow) => borrow.book),
    (0, typeorm_1.JoinColumn)({ name: 'borrow' }),
    __metadata("design:type", Array)
], Book.prototype, "borrow", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => book_history_entity_1.BookHistory, (bookHistory) => bookHistory.book),
    (0, typeorm_1.JoinColumn)({ name: 'bookHistory' }),
    __metadata("design:type", Array)
], Book.prototype, "bookHistory", void 0);
exports.Book = Book = __decorate([
    (0, typeorm_1.Entity)('book')
], Book);
//# sourceMappingURL=book.entity.js.map