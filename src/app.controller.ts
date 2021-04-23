import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { AppServiceImpl } from './app.service';
import { Institution } from './entities/Institution';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppServiceImpl) {}

  // @TODO, this health endpoint should also check database health status as well
  @Get('/health')
  public async health(): Promise<boolean> {
    return true;
  }

  // @TODO this route can be in institutions controller
  @Get('/institutions')
  public async getInstitutions(): Promise<Institution[]> {
    const result = this.appService.findAllInstitutions();
    return result;
  }

  // @TODO this route can be in institutions controller
  @Get('/institutions/subjects/:subject')
  public async getInstitutionsBySubject(
    @Param('subject') subject: string,
  ): Promise<Institution[]> {
    const result = this.appService.findInstitutionsBySubject(subject);
    return result;
  }

  @Get('/institutions/institution/subjects/:subject')
  public async getInstitutionBySubject(
    @Param('subject') subject: string,
  ): Promise<Institution> {
    const result = this.appService.findSingleInstitutionBySubject(subject);

    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
