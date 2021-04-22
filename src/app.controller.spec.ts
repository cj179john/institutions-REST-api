import { Test, TestingModule } from '@nestjs/testing';
import fixtures from '../test/fixtures/institutions';
import { AppController } from './app.controller';
import { AppServiceImpl } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let mockAppService: jest.Mock;

  beforeEach(async () => {
    mockAppService = jest.fn(() => ({
      findAllInstitutions: jest.fn().mockResolvedValue(fixtures),
      findInstitutionBySubject: jest.fn().mockResolvedValue(fixtures),
    }));
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppServiceImpl,
          useFactory: mockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Institutions', () => {
    it('should return all institutions', async () => {
      // Act
      const result = await appController.getInstitutions();

      // Assert
      expect(result).toEqual(fixtures);
    });

    it('should return all institutions by subjects', async () => {
      // Act
      const result = await appController.getInstitutionsBySubject('Biology');

      // Assert
      expect(result).toEqual(fixtures);
    });
  });
});
