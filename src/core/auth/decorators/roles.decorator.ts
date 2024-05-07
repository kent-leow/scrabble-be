import { Reflector } from '@nestjs/core';
import { Role } from '~/core/users/enums/role.enum';

export const Roles = Reflector.createDecorator<Role[]>();