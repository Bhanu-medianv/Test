import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserCommand } from "./commands.impl";
import { Repository } from "typeorm";
import { User } from "../entities/user-created.entity";
import { InjectRepository } from "@nestjs/typeorm";

@CommandHandler(UserCommand)
export class CreateCommand implements ICommandHandler<UserCommand>{
    constructor(
        @InjectRepository(User)
        private readonly userRepository:Repository<User>){}
    
    async execute(command: UserCommand): Promise<any> {
       const new_user = this.userRepository.create(command.createUserCreatedDto)
       await this.userRepository.save(new_user)
       return new_user
    }
}
