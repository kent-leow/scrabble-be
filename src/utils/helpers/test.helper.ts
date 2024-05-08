// src/shared/mongoose.test.module.ts
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Score, ScoreSchema } from '~/core/scores/scores.schema';
import { User, UserSchema } from '~/core/users/users.schema';

let mongod: MongoMemoryServer;

export const rootMongooseTestModule = async () => {
  mongod = await MongoMemoryServer.create(); // This starts the instance
  const mongoUri = mongod.getUri();
  return [
    MongooseModule.forRoot(mongoUri),
    MongooseModule.forFeature([
      { name: Score.name, schema: ScoreSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ];
};

export const closeInMongodConnection = async () => {
  if (mongod) await mongod.stop();
};
