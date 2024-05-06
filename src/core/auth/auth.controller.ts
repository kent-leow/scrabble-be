import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '~/core/auth/auth.service';
import { AuthGuard } from '~/core/auth/auth.guard';
import { AuthGuardRequest } from '~/core/auth/auth.type';
import { CreateUserDto } from '~/core/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, string>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body() body: Record<string, string>) {
    return this.authService.refresh(body.refresh_token);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthGuardRequest) {
    return req.user;
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  logout(@Request() req: AuthGuardRequest) {
    return this.authService.logout(req.user.sub);
  }
}
