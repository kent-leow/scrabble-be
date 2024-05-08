import { NestFactory } from '@nestjs/core';
import { AppModule } from '~/app.module';
import { useContainer } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';
import configuration from '~/utils/configs/configuration';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Create the app
  const app = await NestFactory.create(AppModule, {});

  // Enable CORS
  app.enableCors({
    origin: configuration().ALLOWED_HOSTS,
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

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the app
  await app.listen(3000);
}

bootstrap();
