import { ArrayMinSize, IsArray, IsString } from "class-validator"

export class CreateWordsDto {
    @IsArray()
    @IsString({each: true})
    @ArrayMinSize(1)

    words: string[]
}
