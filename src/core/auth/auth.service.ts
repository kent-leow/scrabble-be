import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '~/core/users/users.service';
import * as argon2 from 'argon2';
import { Types } from 'mongoose';
import { AuthTokensDto } from '~/core/auth/dtos/auth-tokens.dto';
import { User } from '~/core/users/users.schema';
import { CreateUserDto } from '~/core/users/dtos/create-user.dto';
import { SignInDto } from '~/core/users/dtos/sign-in.dto';
import { RefreshDto } from '~/core/users/dtos/refresh.dto';
import { TokenPayloadDto } from '~/core/auth/dtos/token-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    const user = await this.usersService.findOne(createUserDto.username);
    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    await this.usersService.create({
      username: createUserDto.username,
      password: await this.hashData(createUserDto.password),
    });
  }

  async signIn(signInDto: SignInDto): Promise<AuthTokensDto> {
    const user = await this.usersService.findOne(signInDto.username);
    if (
      !user ||
      !(user && (await argon2.verify(user.password, signInDto.password)))
    ) {
      throw new UnauthorizedException();
    }
    return this.generateNewAuthTokens(user);
  }

  async logout(userId: Types.ObjectId) {
    await this.usersService.update(userId, { refreshToken: undefined });
  }

  async refresh(refreshDto: RefreshDto): Promise<AuthTokensDto> {
    if (!(await this.jwtService.verifyAsync(refreshDto.refreshToken))) {
      throw new BadRequestException();
    }
    const user = await this.usersService.findOneByRefreshToken(
      refreshDto.refreshToken,
    );
    if (!user) {
      throw new BadRequestException();
    }
    return this.generateNewAuthTokens(user);
  }

  async generateNewAuthTokens(user: User) {
    const payload: TokenPayloadDto = {
      sub: user._id,
      username: user.username,
      role: user.role,
    };
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    await this.usersService.update(user._id, { refreshToken });

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
      }),
      refreshToken: refreshToken,
    };
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
