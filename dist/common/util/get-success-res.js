"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuccessRes = void 0;
const getSuccessRes = (data, statusCode = 200, message = 'success') => {
    return {
        statusCode,
        message,
        data,
    };
};
exports.getSuccessRes = getSuccessRes;
//# sourceMappingURL=get-success-res.js.map