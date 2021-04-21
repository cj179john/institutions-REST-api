import { Test } from '@nestjs/testing';
import { AppService, AppServiceImpl } from './app.service';
import { DataAccessImpl } from './dataAccess.service';

describe('App Service', () => {
  let appService: AppService;
  let dataAccess: DataAccessImpl;
  let findAllMock: jest.Mock;
  let mockDataAccess: jest.Mock;

  beforeEach(async () => {
    findAllMock = jest.fn();

    mockDataAccess = jest.fn(() => ({
      findAll: findAllMock,
    }));

    const module = await Test.createTestingModule({
      providers: [
        AppServiceImpl,
        {
          provide: DataAccessImpl,
          useFactory: mockDataAccess,
        },
      ],
    }).compile();

    appService = module.get<AppServiceImpl>(AppServiceImpl);
    dataAccess = module.get<DataAccessImpl>(DataAccessImpl);
  });

  it('should find all institutions', async () => {
    // Assign
    findAllMock.mockResolvedValue([]);

    // Act
    const results = await appService.findAllInstitutions();

    // Assert
    expect(dataAccess.findAll).toBeCalled();
    expect(results).toEqual([]);
  });
});
