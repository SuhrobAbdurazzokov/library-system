"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowModule = void 0;
const common_1 = require("@nestjs/common");
const borrow_service_1 = require("./borrow.service");
const borrow_controller_1 = require("./borrow.controller");
const typeorm_1 = require("@nestjs/typeorm");
const borrow_entity_1 = require("../../core/entity/borrow.entity");
const users_module_1 = require("../users/users.module");
const book_module_1 = require("../book/book.module");
const users_entity_1 = require("../../core/entity/users.entity");
const book_entity_1 = require("../../core/entity/book.entity");
const book_history_entity_1 = require("../../core/entity/book-history.entity");
let BorrowModule = class BorrowModule {
};
exports.BorrowModule = BorrowModule;
exports.BorrowModule = BorrowModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([borrow_entity_1.Borrow, users_entity_1.Users, book_entity_1.Book, book_history_entity_1.BookHistory]),
            book_module_1.BookModule,
            users_module_1.UsersModule,
        ],
        controllers: [borrow_controller_1.BorrowController],
        providers: [borrow_service_1.BorrowService],
    })
], BorrowModule);
//# sourceMappingURL=borrow.module.js.map