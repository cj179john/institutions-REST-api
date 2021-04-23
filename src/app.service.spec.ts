import { Test } from '@nestjs/testing';
import fixtures from '../test/fixtures/institutions';
import { AppService, AppServiceImpl } from './app.service';
import { DataAccessImpl } from './dataAccess.service';

describe('App Service', () => {
  let appService: AppService;
  let findAllMock: jest.Mock;
  let findByMock: jest.Mock;
  let mockDataAccess: jest.Mock;

  beforeEach(async () => {
    findAllMock = jest.fn();
    findByMock = jest.fn();

    mockDataAccess = jest.fn(() => ({
      findAll: findAllMock,
      findBySubject: findByMock,
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
  });

  it('should find all institutions', async () => {
    // Assign
    findAllMock.mockResolvedValue(fixtures);

    // Act
    const results = await appService.findAllInstitutions();

    // Assert
    expect(findAllMock).toBeCalled();
    expect(results).toEqual(fixtures);
  });

  it('should find all institutions by subject', async () => {
    // Assign
    const [, ...findByFixtures] = fixtures;
    findByMock.mockResolvedValue(findByFixtures);

    // Act
    const results = await appService.findInstitutionsBySubject('Biology');

    // Assert
    expect(findByMock).toBeCalled();
    expect(results).toEqual(findByFixtures);
  });
});
