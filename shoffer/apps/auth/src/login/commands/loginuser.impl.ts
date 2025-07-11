import { CreateLoginDto } from "../dto/create-login.dto";

export class LoginUserImpl{
    
    constructor(public readonly loginInfo:CreateLoginDto){console.log("step-2")}
}