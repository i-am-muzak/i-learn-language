import { IsEmail, IsNotEmpty, Length, min } from "class-validator"

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(8)
    password: string
}


export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(8)
    password: string
}