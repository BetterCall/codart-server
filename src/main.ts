import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.enableCors();
  const PORT = process.env.PORT || 5000;

  await app.listen(PORT, "0.0.0.0")
  console.log("Listening on Port  ", PORT);
}
bootstrap();
