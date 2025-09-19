"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryPager = void 0;
const pager_1 = require("./pager");
class RepositoryPager {
    static DEFAULT_PAGE = 1;
    static DEFAULT_PAGE_SIZE = 10;
    static async findAll(repository, options) {
        const [data, count] = await repository.findAndCount(RepositoryPager.normalizePagination(options));
        return pager_1.Pager.of(200, 'success', data, count, options?.take ?? this.DEFAULT_PAGE_SIZE, options?.skip ?? this.DEFAULT_PAGE);
    }
    static normalizePagination(options) {
        let page = (options?.skip ?? RepositoryPager.DEFAULT_PAGE) - 1;
        return {
            ...options,
            take: options?.take,
            skip: page * (options?.take ?? RepositoryPager.DEFAULT_PAGE_SIZE),
        };
    }
}
exports.RepositoryPager = RepositoryPager;
//# sourceMappingURL=repositoryPager.js.map