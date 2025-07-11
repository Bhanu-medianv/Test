import { IsAlphanumeric, IsEmail, IsString, Matches, MIN_LENGTH, MinLength } from "class-validator";

export class CreateUserCreatedDto {
    @IsString()
    name:string

    @IsEmail()
    email:string

    @IsString()
    @MinLength(8)
    @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'})
    password:string

}
