import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCreatedService } from './user-created.service';
import { CreateUserCreatedDto } from './dto/create-user-created.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserCommand } from './commands/commands.impl';
import { QueryIMPL } from './queries/queries.impl';

@Controller('user')
export class UserCreatedController {
  constructor(private readonly userCreatedService: UserCreatedService,
    private readonly commandBus:CommandBus,
    private readonly QueryBus :QueryBus) {}

  @Post()
  create(@Body() createUserCreatedDto: CreateUserCreatedDto) {

    return this.commandBus.execute(new UserCommand(createUserCreatedDto));
  }
  @Get()
  getAllUser(){
    return this.QueryBus.execute(new QueryIMPL())
  }
  
}
