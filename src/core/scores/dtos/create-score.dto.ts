import { IsNotEmpty, Validate } from 'class-validator';
import { ScoreValidator } from '~/core/scores/validators/score.validator';

export class CreateScoreDto {
  @IsNotEmpty({ message: 'Empty string is not allowed.' })
  string: string;

  @Validate(ScoreValidator)
  score: number;
}
