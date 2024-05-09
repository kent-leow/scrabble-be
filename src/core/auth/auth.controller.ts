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
import { AuthGuard } from '~/core/auth/guards/auth.guard';
import { AuthGuardRequest } from '~/core/auth/auth.type';
import { CreateUserDto } from '~/core/users/dtos/create-user.dto';
import { SignInDto } from '~/core/users/dtos/sign-in.dto';
import { RefreshDto } from '~/core/users/dtos/refresh.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new user',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  @ApiOperation({
    summary: 'Login with username and password',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @ApiOperation({
    summary: 'Refresh the access token with the refresh token',
  })
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto);
  }

  @ApiOperation({
    summary: 'Get the user profile',
  })
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: AuthGuardRequest) {
    return req.user;
  }

  @ApiOperation({
    summary: 'Logout the user',
  })
  @UseGuards(AuthGuard)
  @Get('logout')
  logout(@Request() req: AuthGuardRequest) {
    return this.authService.logout(req.user.sub);
  }
}
