import { Test, TestingModule } from '@nestjs/testing';
import { RelUserLevelService } from './rel_user_level.service';

describe('RelUserLevelService', () => {
  let service: RelUserLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelUserLevelService],
    }).compile();

    service = module.get<RelUserLevelService>(RelUserLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
