import { Module } from '@nestjs/common';
import { Score, ScoreSchema } from '~/core/scores/scores.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoresController } from '~/core/scores/scores.controller';
import { ScoresService } from '~/core/scores/scores.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Score.name, schema: ScoreSchema }]),
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
