import { Types } from 'mongoose';

export type AuthGuardRequest = Request & {
  user: { sub: Types.ObjectId; username: string };
};
