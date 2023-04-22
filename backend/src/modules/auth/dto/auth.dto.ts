import { IsNotEmpty, IsEmail, Length } from "class-validator"

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(8)
    password: string
}

export class RegisterUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(8)
    password: string
}