import { IsBoolean, IsNotEmpty } from "class-validator";

export class Dto_CreateLanguage {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean
}