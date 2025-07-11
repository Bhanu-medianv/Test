import { CreateLoginDto } from "../../../../../libs/assets/dtos/auth.dto/create-login.dto";

export class LoginUserImpl{
    
    constructor(public readonly loginInfo:CreateLoginDto){console.log("step-2")}
}