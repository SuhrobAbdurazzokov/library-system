import { FindManyOptions } from 'typeorm';
export interface IResponse {
    statusCode: number;
    message: string;
    data: object;
}
export interface IResponsePagination extends IResponse {
    totalElements: number;
    totalPages: number;
    pageSize: number;
    currentPage: number;
    from: number;
    to: number;
}
export interface IFindOptions<T> extends FindManyOptions<T> {
}
