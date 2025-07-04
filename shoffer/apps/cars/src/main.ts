import { NestFactory } from '@nestjs/core';
import { CarsModule } from './cars.module';

async function bootstrap() {
  const app = await NestFactory.create(CarsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
