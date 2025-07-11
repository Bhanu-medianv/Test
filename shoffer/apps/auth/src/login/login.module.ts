import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { LoginCommandHandler } from './commands/login.command.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthUser } from './entities/Authuser.entity';
import { Session } from './entities/Session.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LoginUser } from './commands/loginUser.command.handler';
import { Comman } from './commands';

@Module({
  imports:[CqrsModule,TypeOrmModule.forFeature([AuthUser,Session]),
  ClientsModule.register([
    {
      name:'SESSION',
      transport:Transport.KAFKA,
      options:{
        client:{
          brokers:['0.0.0.0:29094']
        }
      }
    }
  ])],
  controllers: [LoginController],
  providers: [LoginService,...Comman],
})
export class LoginModule {}
