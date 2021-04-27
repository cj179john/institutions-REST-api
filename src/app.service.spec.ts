import { Test } from '@nestjs/testing';
import fixtures from '../test/fixtures/institutions';
import submissionFixtures from '../test/fixtures/submissions';
import { AppService, AppServiceImpl } from './app.service';
import { DataAccessImpl } from './dataAccess.service';

describe('App Service', () => {
  let appService: AppService;
  let findAllMock: jest.Mock;
  let findByMock: jest.Mock;
  let mockDataAccess: jest.Mock;
  let findSubmissionsMock: jest.Mock;

  beforeEach(async () => {
    findAllMock = jest.fn();
    findByMock = jest.fn();
    findSubmissionsMock = jest.fn();

    mockDataAccess = jest.fn(() => ({
      findAll: findAllMock,
      findBySubject: findByMock,
      findSubmissionsPerInstitution: findSubmissionsMock,
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

  it('should find all submissions data group by year and institution', async () => {
    // Assign
    findSubmissionsMock.mockResolvedValue(submissionFixtures);

    // Act
    const results = await appService.findSubmissions();

    // Assert
    expect(findSubmissionsMock).toBeCalled();
    expect(results).toEqual(submissionFixtures);
  });
});
