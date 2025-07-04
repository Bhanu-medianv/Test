import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginCommandImpl } from "./login.command.Impl";
import { InjectRepository } from "@nestjs/typeorm";

@CommandHandler(LoginCommandImpl)
export class LoginCommandHandler implements ICommandHandler<LoginCommandImpl>{
    constructor(){}
    async execute(command: LoginCommandImpl): Promise<any> {
        
    }
} 