import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Institution } from './entities/Institution';

export interface DataAccess {
  findAll(entity: string): Promise<Institution[]>;
  findBySubject(where: { [key: string]: string }): Promise<Institution[]>;
}

@Injectable()
export class DataAccessImpl implements DataAccess {
  constructor(private readonly em: EntityManager) {}

  public async findAll(): Promise<Institution[]> {
    return await this.em.find(Institution, {});
  }

  public async findBySubject(where: {
    [key: string]: string;
  }): Promise<Institution[]> {
    const qb = this.em.createQueryBuilder(Institution, 'i');

    const query = qb
      .select('i.name')
      .leftJoin('i.submissions', 's')
      .leftJoin('s.subjects', 's2')
      .where('s2.name = ?', [where.subject])
      .groupBy('i.name, s2.name');

    return await query.execute<Institution[]>();
  }
}
