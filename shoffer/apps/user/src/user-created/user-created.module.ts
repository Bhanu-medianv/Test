import { Module } from '@nestjs/common';
import { UserCreatedService } from './user-created.service';
import { UserCreatedController } from './user-created.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCommand } from './commands/commands.handler';
import { User } from '../../../../libs/assets/entities/user.entities/user-created.entity';
import { QueryIMPL } from './queries/queries.impl';
import { Queryhand } from './queries/queries.handler';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { CacheModule } from '@nestjs/cache-manager';
import { UserSession } from '../../../../libs/assets/entities/user.entities/user.session.rename';
import { UserSessionHandler } from './commands/session.handler';

@Module({
  imports:[CqrsModule.forRoot(),TypeOrmModule.forFeature([User,UserSession]),
  ClientsModule.register([
      {
        name : 'User',
        transport:Transport.GRPC,
        options:{
          url:'localhost:3000',
          package:'user',
          protoPath:join(__dirname , '../../../../shoffer/libs/assets/protos/user/user.proto'),
      
        }
        
      }
    ]),CacheModule.register()
],
  controllers: [UserCreatedController],
  providers: [UserCreatedService,CreateCommand ,Queryhand,UserSessionHandler],
})
export class UserCreatedModule {}
