import { Controller, Get, Param } from '@nestjs/common';
import { AppServiceImpl } from './app.service';
import { Institution } from './entities/Institution';

@Controller('/institutions')
export class AppController {
  constructor(private readonly appService: AppServiceImpl) {}

  @Get('/')
  public async getInstitutions(): Promise<Institution[]> {
    const result = this.appService.findAllInstitutions();
    return result;
  }

  @Get('/subjects/:subject')
  public async getInstitutionsBySubject(
    @Param('subject') subject: string,
  ): Promise<Institution[]> {
    const result = this.appService.findInstitutionBySubject(subject);
    return result;
  }
}
