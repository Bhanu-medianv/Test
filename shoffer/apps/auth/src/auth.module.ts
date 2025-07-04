import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [LoginModule ],
  controllers: [],
  providers: [],
})
export class AuthModule {}
