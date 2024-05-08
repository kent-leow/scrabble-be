import { Test, TestingModule } from '@nestjs/testing';
import { ScoresController } from '~/core/scores/scores.controller';
import { ScoresService } from '~/core/scores/scores.service';
import { CanActivate } from '@nestjs/common';
import { AuthGuard } from '~/core/auth/guards/auth.guard';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '~/utils/helpers/test.helper';
import { Model } from 'mongoose';
import { Score } from '~/core/scores/scores.schema';
import { getModelToken } from '@nestjs/mongoose';
import { createMock } from '@golevelup/ts-jest';
import { AuthGuardRequest } from '~/core/auth/auth.type';
import { mockCreateScoreDto } from '~/utils/mocks/auth.mock';
import { mockUser } from '~/utils/mocks/users.mock';
import { mockScore } from '~/utils/mocks/scores.mock';
import { scoringRules } from '~/utils/constants/constants';

describe('ScoresController', () => {
  let controller: ScoresController;
  let model: Model<Score>;

  beforeEach(async () => {
    const mockAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoresController],
      providers: [ScoresService],
      imports: [...(await rootMongooseTestModule())],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<ScoresController>(ScoresController);
    model = module.get<Model<Score>>(getModelToken(Score.name));
  });

  afterEach(async () => {
    await closeInMongodConnection();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new score based on userId and score', async () => {
      const createScoreDto = mockCreateScoreDto();
      const user = mockUser();
      const authGuardRequest = createMock<AuthGuardRequest>({
        user: { sub: user._id, username: user.username },
      });
      await controller.create(authGuardRequest, createScoreDto);
      const records = await model.find().exec();
      expect(records).toHaveLength(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of scores', async () => {
      const scores: Score[] = Array.from({ length: 2 }, (_, i) =>
        mockScore({ score: i, string: `string-${i}` }),
      );
      await model.create(scores);
      expect(await controller.findAll()).toHaveLength(2);
    });
  });

  describe('scoreRules', () => {
    it('should return scoring rules', () => {
      expect(controller.scoreRules()).toStrictEqual(scoringRules);
    });
  });

  describe('deleteAll', () => {
    it('should delete all scores', async () => {
      await model.create(mockScore());
      expect(await model.find().exec()).toHaveLength(1);
      await controller.deleteAll();
      expect(await model.find().exec()).toHaveLength(0);
    });
  });
});
