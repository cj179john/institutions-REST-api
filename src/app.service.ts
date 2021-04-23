import { Injectable } from '@nestjs/common';
import { DataAccessImpl } from './dataAccess.service';
import { Institution } from './entities/Institution';

export interface AppService {
  findAllInstitutions: () => Promise<Institution[]>;
  findInstitutionsBySubject: (subject: string) => Promise<Institution[]>;
  findSingleInstitutionBySubject: (subject: string) => Promise<Institution>;
}

@Injectable()
export class AppServiceImpl implements AppService {
  constructor(private readonly dataAccessService: DataAccessImpl) {}

  public async findAllInstitutions() {
    return await this.dataAccessService.findAll();
  }

  public async findInstitutionsBySubject(subject: string) {
    return await this.dataAccessService.findBySubject(subject);
  }

  public async findSingleInstitutionBySubject(subject: string) {
    return await this.dataAccessService.findOneBySubject(subject);
  }
}
