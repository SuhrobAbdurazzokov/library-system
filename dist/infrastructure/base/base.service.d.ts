import { Repository, FindManyOptions } from 'typeorm';
import { IFindOptions, IResponse, IResponsePagination } from '../interface/resonse.interface';
export declare class BaseService<CreateDto, UpdateDto, Entity extends {
    id: string;
}> {
    private readonly repository;
    constructor(repository: Repository<Entity>);
    get getRepository(): Repository<Entity>;
    create(dto: CreateDto): Promise<IResponse>;
    findAll(where?: FindManyOptions<Entity>): Promise<IResponse>;
    findAllWithPagination(options?: IFindOptions<Entity>): Promise<IResponsePagination>;
    findOneById(id: string, options?: FindManyOptions<Entity>): Promise<IResponse>;
    update(id: string, dto: UpdateDto): Promise<IResponse>;
    delete(id: string): Promise<IResponse>;
}
