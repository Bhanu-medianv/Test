import { CreateUserCreatedDto } from "../dto/create-user-created.dto";
import { UserSessionDto } from "../dto/create.session.dto";

export class UserCommand{
    constructor(
        public readonly createUserCreatedDto: CreateUserCreatedDto
    ){}
}
 

export class UserSessionImpl{
    constructor(
        public readonly createUserSession:UserSessionDto
    ){}
}