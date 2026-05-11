import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for React frontend
  app.enableCors({
    origin: 'book-nest-frontend-8lfa17jh6-keerthana198s-projects.vercel.app',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Global prefix
  app.setGlobalPrefix('api');

  const port = 3000;
  await app.listen(port);
  console.log(`🚀 BookNest backend running on http://localhost:${port}/api`);
}
bootstrap();
