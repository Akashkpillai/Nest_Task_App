import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class signUpDto {

    @IsNotEmpty()
    readonly name : string

    @IsNotEmpty()
    @IsEmail({},{message:"Please enter valid email"})
    readonly email : string

    @IsNotEmpty()
    @MinLength(6)
    readonly password:string
}