import { Module } from '@nestjs/common';
import { AuthModule } from '~/core/auth/auth.module';
import { UsersModule } from '~/core/users/users.module';
import { AppController } from '~/app.controller';
import { AppService } from '~/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoresModule } from '~/core/scores/scores.module';
import { UsersController } from './core/users/users.controller';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest'),
    ScoresModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
