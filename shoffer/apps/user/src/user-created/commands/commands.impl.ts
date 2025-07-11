import { CreateUserCreatedDto } from "../../../../../libs/assets/dtos/user.dto/create-user-created.dto";
import { UserSessionDto } from "../../../../../libs/assets/dtos/user.dto/create.session.dto";

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