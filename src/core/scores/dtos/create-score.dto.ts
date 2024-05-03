import { IsNotEmpty, Validate } from 'class-validator';
import { ScoreValidator } from '~/core/scores/validators/score.validator';

export class CreateScoreDto {
  @IsNotEmpty()
  string: string;

  @Validate(ScoreValidator)
  score: string;
}
