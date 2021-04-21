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
    const qb = this.em.createQueryBuilder(Institution, 'e');

    const query = qb
      .select('*')
      .leftJoin('e.submissions', 'es')
      .leftJoin('es.subjects', 'ess')
      .where(where);

    return await query.execute<Institution[]>();
  }
}
