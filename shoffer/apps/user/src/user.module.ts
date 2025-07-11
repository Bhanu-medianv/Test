import { Module } from '@nestjs/common';
import { UserCreatedModule } from './user-created/user-created.module';
import { User } from './user-created/entities/user-created.entity';
import { DatabaseModule } from 'libs/dynamic.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { UserSession } from './user-created/entities/user.session.rename';

@Module({
  imports: [UserCreatedModule,DatabaseModule.forRoot('user' , [User,UserSession]),
    ClientsModule.register([
      {
        name:'Session',
        transport:Transport.KAFKA,
        options:{
          client:{
            brokers:['localhost:9092']
          },          
        }
      }
    ])
  ],
  controllers: [],
  providers: [],
})
export class UserModule {}
