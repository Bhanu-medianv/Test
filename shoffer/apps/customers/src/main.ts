import { NestFactory } from '@nestjs/core';
import { CustomersModule } from './customers.module';

async function bootstrap() {
  const app = await NestFactory.create(CustomersModule);
  await app.listen(process.env.port ?? 3004);
}
bootstrap();
