import { Test, TestingModule } from '@nestjs/testing';
import { ScoresService } from '~/core/scores/scores.service';
import { getModelToken } from '@nestjs/mongoose';
import { Score } from '~/core/scores/scores.schema';
import { Model, Types } from 'mongoose';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '~/utils/helpers/test.helper';
import { mockScore } from '~/utils/mocks/scores.mock';
import { CreateScoreDto } from '~/core/scores/dtos/create-score.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('ScoresService', () => {
  let service: ScoresService;
  let model: Model<Score>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoresService],
      imports: [...(await rootMongooseTestModule())],
    }).compile();

    service = module.get<ScoresService>(ScoresService);
    model = module.get<Model<Score>>(getModelToken(Score.name));
  });

  afterEach(async () => {
    await closeInMongodConnection();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(model).toBeDefined();
  });

  describe('create', () => {
    it('should create a new score based on userId and score', async () => {
      const score: Score = mockScore();
      const createScoreDto: CreateScoreDto = {
        string: score.string,
        score: score.score,
      };
      await service.create(score.user._id, createScoreDto);
      const records = await model.find().exec();
      expect(records[0].toObject()).toStrictEqual({
        ...score,
        _id: expect.any(Types.ObjectId),
        __v: 0,
        user: score.user._id,
      });
      await expect(
        service.create(score.user._id, createScoreDto),
      ).rejects.toThrowError(
        new HttpException('Duplicated word', HttpStatus.CONFLICT),
      );
    });
  });

  describe('findAll', () => {
    it('should return the top 10 scores', async () => {
      const scores: Score[] = Array.from({ length: 15 }, (_, i) =>
        mockScore({ score: i, string: `string-${i}` }),
      );
      await model.insertMany(scores);
      const topScores = await service.findAll();
      expect(topScores).toHaveLength(10);
    });
  });

  describe('deleteAll', () => {
    it('should delete all scores', async () => {
      await model.insertMany(Array.from({ length: 5 }, () => mockScore()));
      await service.deleteAll();
      const records = await model.find().exec();
      expect(records).toHaveLength(0);
    });
  });
});
