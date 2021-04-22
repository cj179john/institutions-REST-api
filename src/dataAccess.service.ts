import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Institution } from './entities/Institution';

export interface DataAccess {
  findAll(entity: string): Promise<Institution[]>;
  findBySubject(subject: string): Promise<Institution[]>;
}

/* @TODO this service can be split into entity specific service
 * e.g. InstitutionDataAccess. Also, we can write an integration
 * test for it, which will need a test database setup
 */
@Injectable()
export class DataAccessImpl implements DataAccess {
  constructor(private readonly em: EntityManager) {}

  public async findAll(): Promise<Institution[]> {
    return await this.em.find(Institution, {});
  }

  public async findBySubject(subject: string): Promise<Institution[]> {
    const qb = this.em.createQueryBuilder(Institution, 'i');

    const query = qb
      .select('i.name')
      .leftJoin('i.submissions', 's')
      .leftJoin('s.subjects', 's2')
      .where('LOWER(s2.name) = LOWER(?)', [subject])
      .groupBy('i.name');

    return await query.execute<Institution[]>();
  }
}
