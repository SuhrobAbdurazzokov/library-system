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
exports.CreateBorrowDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBorrowDto {
    borrowDate;
    dueDate;
    returnDate;
    overdue;
    bookId;
    userId;
}
exports.CreateBorrowDto = CreateBorrowDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2023-12-25T10:30:00Z',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBorrowDto.prototype, "borrowDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2024-09-15T16:40:25Z',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBorrowDto.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2025-09-15T16:40:25Z',
        required: false,
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBorrowDto.prototype, "returnDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'boolean',
        example: false,
        required: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateBorrowDto.prototype, "overdue", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: '2622b57c-16b7-444e-87d0-a9a8f57bfdab',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBorrowDto.prototype, "bookId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: 'string',
        example: 'be35f553-8473-4486-a96f-a9ce120ec9ae',
    }),
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBorrowDto.prototype, "userId", void 0);
//# sourceMappingURL=create-borrow.dto.js.map