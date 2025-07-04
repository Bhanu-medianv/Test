import { Module } from '@nestjs/common';
import { UserCreatedService } from './user-created.service';
import { UserCreatedController } from './user-created.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCommand } from './commands/commands.handler';
import { User } from './entities/user-created.entity';
import { QueryIMPL } from './queries/queries.impl';
import { Queryhand } from './queries/queries.handler';

@Module({
  imports:[CqrsModule.forRoot(),TypeOrmModule.forFeature([User])],
  controllers: [UserCreatedController],
  providers: [UserCreatedService,CreateCommand ,Queryhand],
})
export class UserCreatedModule {}
