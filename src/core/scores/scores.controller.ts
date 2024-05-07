import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ScoresService } from '~/core/scores/scores.service';
import { CreateScoreDto } from '~/core/scores/dtos/create-score.dto';
import { Score } from '~/core/scores/scores.schema';
import { AuthGuard } from '~/core/auth/guards/auth.guard';
import { AuthGuardRequest } from '~/core/auth/auth.type';
import { scoringRules } from '~/utils/constants/constants';
import { Roles } from '~/core/auth/decorators/roles.decorator';
import { Role } from '~/core/users/enums/role.enum';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('scores')
@Controller('scores')
export class ScoresController {
  constructor(private scoresService: ScoresService) {}

  @ApiOperation({
    summary: 'Create a new score',
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Request() req: AuthGuardRequest, @Body() score: CreateScoreDto) {
    return this.scoresService.create(req.user.sub, score);
  }

  @ApiOperation({
    summary: 'Get top 10 high scores',
  })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(): Promise<Score[]> {
    return this.scoresService.findAll();
  }

  @ApiOperation({
    summary: 'Get scoring rules',
  })
  @HttpCode(HttpStatus.OK)
  @Get('rules')
  leaderboard(): Record<string, number> {
    return scoringRules;
  }

  @ApiOperation({
    summary: 'Delete all scores',
  })
  @Roles([Role.ADMIN])
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete()
  deleteAll(): Promise<void> {
    return this.scoresService.deleteAll();
  }
}
