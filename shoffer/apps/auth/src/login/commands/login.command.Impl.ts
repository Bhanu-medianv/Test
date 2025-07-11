import { UserAuthDto } from "../../../../../libs/assets/dtos/auth.dto/UserAuthDto";

export class LoginCommandImpl{
    constructor(public readonly userInfo:UserAuthDto){}
}
