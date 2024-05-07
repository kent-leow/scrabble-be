import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RolesGuard } from '~/core/auth/guards/roles.guard';
import { Role } from '~/core/users/enums/role.enum';

export const Roles = (roles: Role[]) =>
  applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
