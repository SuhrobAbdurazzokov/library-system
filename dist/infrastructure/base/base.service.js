"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const get_success_res_1 = require("../../common/util/get-success-res");
class BaseService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    get getRepository() {
        return this.repository;
    }
    async create(dto) {
        let data = this.repository.create(dto);
        data = await this.repository.save(data);
        return (0, get_success_res_1.getSuccessRes)(data, 201);
    }
    async findAll(where) {
        const data = await this.repository.find(where);
        return (0, get_success_res_1.getSuccessRes)(data);
    }
    async findOneById(id, options) {
        const data = await this.repository.findOne({
            where: { id },
            ...options,
        });
        if (!data) {
            throw new common_1.HttpException('Not found', 404);
        }
        return (0, get_success_res_1.getSuccessRes)(data);
    }
    async update(id, dto) {
        await this.findOneById(id);
        const data = await this.repository.update(id, dto);
        return (0, get_success_res_1.getSuccessRes)(data);
    }
    async delete(id) {
        await this.findOneById(id);
        await this.repository.delete(id);
        return (0, get_success_res_1.getSuccessRes)({});
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map