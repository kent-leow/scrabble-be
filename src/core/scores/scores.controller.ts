import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ScoresService } from '~/core/scores/scores.service';
import { CreateScoreDto } from '~/core/scores/dto/create-score.dto';
import { Score } from '~/core/scores/scores.schema';
import { AuthGuard } from '~/core/auth/auth.guard';
import { AuthGuardRequest } from '~/core/auth/auth.type';
import { scoringRules } from '~/shared/constants';

@Controller('scores')
export class ScoresController {
  constructor(private scoresService: ScoresService) {}

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Request() req: AuthGuardRequest, @Body() score: CreateScoreDto) {
    //return error when error happens
    return this.scoresService.create(req.user.sub, score);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(): Promise<Score[]> {
    return this.scoresService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get('rules')
  leaderboard(): Record<string, number> {
    return scoringRules;
  }
}
