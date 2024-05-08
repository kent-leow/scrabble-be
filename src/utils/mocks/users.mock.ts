import { Types } from 'mongoose';
import { Role } from '~/core/users/enums/role.enum';
import { User } from '~/core/users/users.schema';

export const mockUser = (mock: Partial<User> = {}) => ({
  _id: mock._id || new Types.ObjectId(),
  username: mock.username || 'mock-username',
  password: mock.password || 'mock-password',
  refreshToken: mock.refreshToken || 'mock-refresh-token',
  role: mock.role || Role.USER,
  scores: mock.scores || [],
});
