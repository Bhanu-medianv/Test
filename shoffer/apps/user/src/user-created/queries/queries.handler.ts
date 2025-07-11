import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { QueryIMPL } from "./queries.impl";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../../../../../libs/assets/entities/user.entities/user-created.entity";
import { Repository } from "typeorm";

@QueryHandler(QueryIMPL)
export class Queryhand  implements IQueryHandler<QueryIMPL>{
    constructor(
         @InjectRepository(User)
                private readonly userRepository:Repository<User>){}
    async execute(query: QueryIMPL): Promise<any> {
        return this.userRepository.find()
    }
}