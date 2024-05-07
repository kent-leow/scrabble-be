import { Test, TestingModule } from '@nestjs/testing';
import { ScoresController } from '~/core/scores/scores.controller';
import { ScoresService } from '~/core/scores/scores.service';
import { CanActivate } from '@nestjs/common';
import { AuthGuard } from '~/core/auth/guards/auth.guard';

describe('ScoresController', () => {
  let controller: ScoresController;

  beforeEach(async () => {
    const mockAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoresController],
      providers: [
        {
          provide: ScoresService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<ScoresController>(ScoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
