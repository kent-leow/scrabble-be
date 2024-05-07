import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '~/core/auth/auth.controller';
import { AuthService } from '~/core/auth/auth.service';
import { CanActivate } from '@nestjs/common';
import { AuthGuard } from '~/core/auth/guards/auth.guard';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const mockAuthGuard: CanActivate = { canActivate: jest.fn(() => true) };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {},
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
