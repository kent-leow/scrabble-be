import { Module } from '@nestjs/common';
import { UsersModule } from '~/core/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '~/core/auth/auth.controller';
import { AuthService } from '~/core/auth/auth.service';
import { jwtConstants } from '~/utils/constants/constants';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
