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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({
    summary: 'Get the user profile',
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('me')
  getMe(@Request() req: AuthGuardRequest) {
    return this.usersService.findOne(req.user.username);
  }
}
