import { Test, TestingModule } from '@nestjs/testing';
import { MovieDbAPIService } from './movie-db-api.service';

describe('MovieDbAPIService', () => {
  let service: MovieDbAPIService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovieDbAPIService],
    }).compile();

    service = module.get<MovieDbAPIService>(MovieDbAPIService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
