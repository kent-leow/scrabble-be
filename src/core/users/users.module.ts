import { Module } from '@nestjs/common';
import { UsersService } from '~/core/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '~/core/users/users.schema';
import { UsersController } from '~/core/users/users.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
