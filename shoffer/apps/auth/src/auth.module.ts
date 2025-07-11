import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { DatabaseModule } from 'libs/dynamic.module';
import { AuthUser } from './login/entities/Authuser.entity';
import { Session } from './login/entities/Session.entity';

@Module({
  imports: [LoginModule ,DatabaseModule.forRoot('AuthUser' , [AuthUser , Session])],
  controllers: [],
  providers: [],
})
export class AuthModule {}
