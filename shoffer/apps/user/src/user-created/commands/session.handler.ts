import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserSessionImpl } from "./commands.impl";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserSession } from "../entities/user.session.rename";

@CommandHandler(UserSessionImpl)
export class UserSessionHandler implements ICommandHandler<UserSessionImpl>{
        constructor(@InjectRepository(UserSession) public userRepo:Repository<UserSession>){}


        async execute(command: UserSessionImpl): Promise<UserSession> {
            const new_userSession = this.userRepo.create(command.createUserSession)
            return await this.userRepo.save(new_userSession)
        }
}