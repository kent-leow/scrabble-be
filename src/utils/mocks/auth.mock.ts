import { CreateScoreDto } from '~/core/scores/dtos/create-score.dto';

export const mockCreateScoreDto = (
  mock: Partial<CreateScoreDto> = {},
): CreateScoreDto => ({
  string: mock.string || 'mock-string',
  score: mock.score || 1,
});
