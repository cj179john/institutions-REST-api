import { Injectable } from '@nestjs/common';
import { DataAccessImpl } from './dataAccess.service';
import { Institution } from './entities/Institution';

export interface AppService {
  findAllInstitutions: () => Promise<Institution[]>;
  findInstitutionBySubject: (subject: string) => Promise<Institution[]>;
}

@Injectable()
export class AppServiceImpl implements AppService {
  constructor(private readonly dataAccessService: DataAccessImpl) {}

  public async findAllInstitutions() {
    return await this.dataAccessService.findAll();
  }

  public async findInstitutionBySubject(subject: string) {
    return await this.dataAccessService.findBySubject(subject);
  }
}
