import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '~/core/users/users.service';
import * as argon2 from 'argon2';
import { Types } from 'mongoose';
import { AuthTokens } from '~/core/auth/dto/AuthTokens';
import { User } from '~/core/users/users.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(username: string, pass: string): Promise<void> {
    const user = await this.usersService.findOne(username);
    if (user) {
      throw new UnauthorizedException();
    }
    await this.usersService.create({
      username,
      password: await this.hashData(pass),
    });
  }

  async signIn(username: string, pass: string): Promise<AuthTokens> {
    const user = await this.usersService.findOne(username);
    if (!user || !(user && (await argon2.verify(user.password, pass)))) {
      throw new UnauthorizedException();
    }
    return this.generateNewAuthTokens(user);
  }

  async logout(userId: Types.ObjectId) {
    await this.usersService.update(userId, { refreshToken: undefined });
  }

  async refresh(refreshToken: string): Promise<AuthTokens> {
    if (!(await this.jwtService.verifyAsync(refreshToken))) {
      throw new BadRequestException();
    }
    const user = await this.usersService.findOneByRefreshToken(refreshToken);
    if (!user) {
      throw new BadRequestException();
    }
    return this.generateNewAuthTokens(user);
  }

  async generateNewAuthTokens(user: User) {
    const payload = { sub: user._id, username: user.username };
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });
    await this.usersService.update(user._id, { refreshToken });

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
      }),
      refresh_token: refreshToken,
    };
  }

  hashData(data: string) {
    return argon2.hash(data);
  }
}
