import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator"

export class CreateLevelDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    language_id: string

    @IsNotEmpty()
    @IsNumber()
    value: number

    @IsNotEmpty()
    @IsBoolean()
    is_active: boolean
}