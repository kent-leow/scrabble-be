import { Score, ScoreDocument } from '~/core/scores/scores.schema';
import { mockUser } from '~/utils/mocks/users.mock';
import { Types } from 'mongoose';

export const mockScore = (mock: Partial<Score> = {}): Score => ({
  _id: mock._id || new Types.ObjectId(),
  string: mock.string || 'mock-string',
  user: mock.user || mockUser(),
  score: mock.score || 1,
});

export const mockScoreDocument = (
  mock: Partial<Score> = {},
): Partial<ScoreDocument> => ({
  _id: mock._id || new Types.ObjectId(),
  string: mock.string || 'mock-string',
  user: mock.user || mockUser(),
  score: mock.score || 1,
});
