import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:3000', // Adjust according to your frontend's URL
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  methods: ['GET', 'POST'], // If you're sending cookies or credentials
  });
    // Enable CORS for all origins
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
