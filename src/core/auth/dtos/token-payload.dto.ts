import { Role } from '~/core/users/enums/role.enum';
import { Types } from 'mongoose';

export interface TokenPayloadDto {
  sub: Types.ObjectId;
  username: string;
  role: Role;
}
