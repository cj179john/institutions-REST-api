import { Test, TestingModule } from '@nestjs/testing';
import fixtures from '../test/fixtures/institutions';
import { AppController } from './app.controller';
import { AppServiceImpl } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let mockAppService: jest.Mock;

  let findSingleInstitutionMock: jest.Mock;

  beforeEach(async () => {
    findSingleInstitutionMock = jest.fn();
    mockAppService = jest.fn(() => ({
      findAllInstitutions: jest.fn().mockResolvedValue(fixtures),
      findInstitutionsBySubject: jest.fn().mockResolvedValue(fixtures),
      findSingleInstitutionBySubject: findSingleInstitutionMock,
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

    it('should return all institutions by subject', async () => {
      // Act
      const result = await appController.getInstitutionsBySubject('Biology');

      // Assert
      expect(result).toEqual(fixtures);
    });

    it('should return the highest rated institutions by subject', async () => {
      // Assign
      const institution = fixtures[0];
      findSingleInstitutionMock.mockResolvedValue(institution);

      // Act
      const result = await appController.getInstitutionBySubject('Biology');

      // Assert
      expect(result).toEqual(institution);
    });

    it('should return not found error if no institution was found by subject', async () => {
      // Act
      await expect(
        appController.getInstitutionBySubject('Biology'),
      ).rejects.toThrow('Not Found');
    });
  });
});
