import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserWordDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  word_id: string;
}
