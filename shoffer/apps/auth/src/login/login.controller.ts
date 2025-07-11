import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from '../../../../libs/assets/dtos/auth.dto/create-login.dto';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { LoginCommandImpl,  } from './commands/login.command.Impl';
import { LoginUserImpl } from './commands/loginuser.impl';

@Controller('account')
export class LoginController {
  constructor(private readonly loginService: LoginService,
              private readonly commandBus :CommandBus
              
  ) {}

  @GrpcMethod('UserService' , 'CreateUser')  
  async syncUser(data:{userId:string ,name:string;email:string;password:string}){
    const userInfo = {
      userId:data.userId,
      name:data.name,
      email:data.email,
      password:data.password
    }
    const result = await  this.commandBus.execute(new LoginCommandImpl(userInfo))
    return {
        name: result.name,
        email: result.email,
        password: result.password,
    }
  }
  @Post('login')
  loginUser(@Body() loginDto:CreateLoginDto){
    return this.commandBus.execute(new LoginUserImpl(loginDto))
  }
  
      
}


