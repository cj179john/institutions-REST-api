import { Injectable } from '@nestjs/common';
import { DataAccessImpl } from './dataAccess.service';
import { Institution } from './entities/Institution';

export interface AppService {
  findAllInstitutions: () => Promise<Institution[]>;
}

@Injectable()
export class AppServiceImpl implements AppService {
  constructor(
    private readonly dataAccessService: DataAccessImpl<Institution>,
  ) {}

  public async findAllInstitutions() {
    return await this.dataAccessService.findAll('Institution');
  }
}
