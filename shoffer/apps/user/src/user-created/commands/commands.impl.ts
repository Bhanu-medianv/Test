import { CreateUserCreatedDto } from "../dto/create-user-created.dto";

export class UserCommand{
    constructor(
        public readonly createUserCreatedDto: CreateUserCreatedDto
    ){}
}