import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { scoringRules } from '~/utils/constants/constants';
import { CreateScoreDto } from '~/core/scores/dtos/create-score.dto';

@ValidatorConstraint({ name: 'string', async: true })
@Injectable()
export class ScoreValidator implements ValidatorConstraintInterface {
  async validate(value: number, args: ValidationArguments): Promise<boolean> {
    const dto = args.object as CreateScoreDto;
    const score = dto.string
      .split('')
      .reduce((acc, char) => acc + (scoringRules[char.toUpperCase()] ?? 0), 0);
    if (score !== value) {
      throw new UnprocessableEntityException('No cheating!');
    }
    return true;
  }
}
