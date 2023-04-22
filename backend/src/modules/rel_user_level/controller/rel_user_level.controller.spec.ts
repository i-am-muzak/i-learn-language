import { Test, TestingModule } from '@nestjs/testing';
import { RelUserLevelController } from './rel_user_level.controller';

describe('RelUserLevelController', () => {
  let controller: RelUserLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelUserLevelController],
    }).compile();

    controller = module.get<RelUserLevelController>(RelUserLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
