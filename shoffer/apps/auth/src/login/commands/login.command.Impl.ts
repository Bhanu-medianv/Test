import { UserAuthDto } from "../dto/UserAuthDto";

export class LoginCommandImpl{
    constructor(public readonly userInfo:UserAuthDto){}
}
