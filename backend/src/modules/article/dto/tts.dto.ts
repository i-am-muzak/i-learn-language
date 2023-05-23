import { IsNotEmpty } from "class-validator"

export class TtsDto {
    @IsNotEmpty()
    text: string
}