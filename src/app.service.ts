import { Injectable } from '@nestjs/common';
import { DataAccessImpl } from './dataAccess.service';
import { Institution } from './entities/Institution';
import { Submission } from './entities/Submission';

export interface AppService {
  findAllInstitutions: () => Promise<Institution[]>;
  findInstitutionsBySubject: (subject: string) => Promise<Institution[]>;
  findSingleInstitutionBySubject: (subject: string) => Promise<Institution>;
  findSubmissions: () => Promise<Submission[]>;
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

  public async findSubmissions() {
    return await this.dataAccessService.findSubmissionsPerInstitution();
  }
}
