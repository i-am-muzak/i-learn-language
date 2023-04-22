import { IsBoolean, IsNotEmpty } from "class-validator"

export class Dto_CreateRelUserLevel {
    @IsNotEmpty()
    user_id: string

    @IsNotEmpty()
    level_id: string

    @IsNotEmpty()
    @IsBoolean()
    is_completed: boolean
}