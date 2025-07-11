import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import {  MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  //swagger documentation
    const config = new DocumentBuilder()
      .setTitle('auth')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);


  app.connectMicroservice<MicroserviceOptions>({
    transport:Transport.GRPC,
    options:{
        package:'user',
        protoPath:join(__dirname ,'../../../../shoffer/libs/assets/protos/user/user.proto'),
        url:'localhost:3000'
    }
  })
 
  await app.listen(3002);
}
bootstrap();
