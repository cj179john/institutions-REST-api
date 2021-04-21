import { EntityName } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

export interface DataAccess<T> {
  findAll(entity: string): Promise<T[]>;
  findBy(entity: string, where: { [key: string]: string }): Promise<T[]>;
}

@Injectable()
export class DataAccessImpl<T> implements DataAccess<T> {
  constructor(private readonly em: EntityManager) {}

  public async findAll(entity: string): Promise<T[]> {
    return await this.em.find<T>(entity, {});
  }

  public async findBy(
    entity: EntityName<T>,
    where: { [key: string]: string },
  ): Promise<T[]> {
    const qb = this.em.createQueryBuilder<T>(entity, 'e');

    const query = qb
      .select('*')
      .leftJoin('e.submissions', 'es')
      .leftJoin('es.subjects', 'ess')
      .where(where);

    return await query.execute<T[]>();
  }
}
