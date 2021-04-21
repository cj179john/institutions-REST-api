import { Controller, Get, Param } from '@nestjs/common';
import { AppServiceImpl } from './app.service';
import { Institution } from './entities/Institution';

@Controller()
export class AppController {
  constructor(private readonly appService: AppServiceImpl) {}

  @Get('/institutions')
  public async getInstitutions(): Promise<Institution[]> {
    const result = this.appService.findAllInstitutions();
    return result;
  }

  @Get('/institutions/subjects/:subject')
  public async getInstitutionsBySubject(
    @Param('subject') subject: string,
  ): Promise<Institution[]> {
    const result = this.appService.findInstitutionBySubject(subject);
    return result;
  }
}
