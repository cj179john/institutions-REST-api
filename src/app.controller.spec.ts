import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppServiceImpl } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let mockAppService: jest.Mock;
  beforeEach(async () => {
    mockAppService = jest.fn(() => ({
      findAllInstitutions: jest.fn().mockResolvedValue([]),
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

  describe('root', () => {
    it('should return list all institutions', async () => {
      // Act
      const result = await appController.getInstitutions();

      // Assert
      expect(result).toEqual([]);
    });
  });
});
