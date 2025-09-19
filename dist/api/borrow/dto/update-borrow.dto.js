"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBorrowDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_borrow_dto_1 = require("./create-borrow.dto");
class UpdateBorrowDto extends (0, swagger_1.PartialType)(create_borrow_dto_1.CreateBorrowDto) {
}
exports.UpdateBorrowDto = UpdateBorrowDto;
//# sourceMappingURL=update-borrow.dto.js.map