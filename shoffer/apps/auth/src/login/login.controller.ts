import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { CommandBus } from '@nestjs/cqrs';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService,
              private readonly commandBus :CommandBus
  ) {}

  @Post()
  loginUser(@Body() loginUser:CreateLoginDto){
          return this.commandBus.execute(loginUser)
  }
      
}
