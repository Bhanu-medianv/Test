import { Module } from '@nestjs/common';
import { UserCreatedModule } from './user-created/user-created.module';
import { User } from './user-created/entities/user-created.entity';
import { DatabaseModule } from 'libs/dynamic.module';

@Module({
  imports: [UserCreatedModule,DatabaseModule.forRoot('user' , [User])],
  controllers: [],
  providers: [],
})
export class UserModule {}
