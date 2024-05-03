import { NestFactory } from '@nestjs/core';
import { AppModule } from '~/app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  // Enable class-validator to use the same container as NestJS
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false },
    }),
  );

  await app.listen(3000);
}

bootstrap();
