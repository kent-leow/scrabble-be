import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '~/core/auth/guards/auth.guard';
import { UsersService } from '~/core/users/users.service';
import { AuthGuardRequest } from '~/core/auth/auth.type';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  getMe(@Request() req: AuthGuardRequest) {
    return this.usersService.findOne(req.user.username);
  }
}
