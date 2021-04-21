import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

export interface DataAccess<T> {
  findAll(entity: string): Promise<T[]>;
}

@Injectable()
export class DataAccessImpl<T> implements DataAccess<T> {
  constructor(private readonly em: EntityManager) {}

  public async findAll(entity: string): Promise<T[]> {
    return await this.em.find<T>(entity, {});
  }
}
