import { Module } from '@nestjs/common';
import { AuthModule } from '~/core/auth/auth.module';
import { UsersModule } from '~/core/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoresModule } from '~/core/scores/scores.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '~/utils/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    AuthModule,
    UsersModule,
    ScoresModule,
    MongooseModule.forRoot(configuration().DATABASE_URL),
  ],
})
export class AppModule {}
