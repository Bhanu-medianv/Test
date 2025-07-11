import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginCommandImpl,  } from "./login.command.Impl";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "../entities/Authuser.entity";
import { Repository } from "typeorm";

@CommandHandler(LoginCommandImpl)
export class LoginCommandHandler implements ICommandHandler<LoginCommandImpl>{
    constructor(@InjectRepository(AuthUser) private readonly AuthUserRepo:Repository<AuthUser>,
      
  ){}
    
    async execute(command: LoginCommandImpl ): Promise<any> {  
        console.log("Command received: ", command);
        console.log("UserInfo: ", command.userInfo);
        const authUser =  this.AuthUserRepo.create(command.userInfo)
        console.log(authUser)
        await this.AuthUserRepo.save(authUser)
        return {
          userId:authUser.userId,
      name: authUser.name,
      email: authUser.email,
      password: authUser.password,
    };
    }

}