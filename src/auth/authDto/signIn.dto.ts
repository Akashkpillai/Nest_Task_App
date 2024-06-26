import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class signInDto {
    @IsNotEmpty()
    @IsEmail()
    email:string

    @IsNotEmpty()
    @MinLength(6)
    password:string
}