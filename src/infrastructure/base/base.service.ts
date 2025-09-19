import { HttpException } from '@nestjs/common';
import { getSuccessRes } from 'src/common/util/get-success-res';
import {
  Repository,
  DeepPartial,
  FindOptionsWhere,
  FindOneOptions,
  FindManyOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';
import {
  IFindOptions,
  IResponse,
  IResponsePagination,
} from '../interface/resonse.interface';
import { RepositoryPager } from '../pagination/repositoryPager';

export class BaseService<CreateDto, UpdateDto, Entity extends { id: string }> {
  constructor(private readonly repository: Repository<Entity>) {}

  get getRepository() {
    return this.repository;
  }

  async create(dto: CreateDto): Promise<IResponse> {
    let data = this.repository.create(dto as DeepPartial<Entity>);
    data = await this.repository.save(data);
    return getSuccessRes(data, 201);
  }

  async findAll(where?: FindManyOptions<Entity>): Promise<IResponse> {
    const data = await this.repository.find(where);
    return getSuccessRes(data);
  }

  async findAllWithPagination(
    options?: IFindOptions<Entity>,
  ): Promise<IResponsePagination> {
    return await RepositoryPager.findAll(this.getRepository, options);
  }

  async findOneById(
    id: string,
    options?: FindManyOptions<Entity>,
  ): Promise<IResponse> {
    const data = await this.repository.findOne({
      where: { id } as FindOptionsWhere<Entity>,
      ...options,
    });

    if (!data) {
      throw new HttpException('Not found', 404);
    }

    return getSuccessRes(data);
  }

  async update(id: string, dto: UpdateDto): Promise<IResponse> {
    await this.findOneById(id);
    const data = await this.repository.update(
      id,
      dto as unknown as QueryDeepPartialEntity<Entity>,
    );

    return getSuccessRes(data);
  }

  async delete(id: string): Promise<IResponse> {
    await this.findOneById(id);
    await this.repository.delete(id);
    return getSuccessRes({});
  }
}
