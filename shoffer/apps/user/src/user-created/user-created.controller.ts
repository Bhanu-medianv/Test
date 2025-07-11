import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserCreatedService } from './user-created.service';
import { CreateUserCreatedDto } from '../../../../libs/assets/dtos/user.dto/create-user-created.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UserCommand, UserSessionImpl } from './commands/commands.impl';
import { QueryIMPL } from './queries/queries.impl';
import { MessagePattern, Payload } from '@nestjs/microservices';

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


  //session data comming from auth 
  @MessagePattern('session-creates')
  createSession(@Payload() message:any){
    const sessionData = message
    return this.commandBus.execute(new UserSessionImpl(sessionData))
    
  }
}

