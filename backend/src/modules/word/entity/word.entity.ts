import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WordDocument = Word & Document;

@Schema()
export class Word {
  @Prop(
    {
        required: true,
        unique: true
    }
  )
  word: string

  @Prop()
  definition: string

  @Prop()
  british_audio: string

  @Prop()
  us_audio: string
}

export const WordEntity = SchemaFactory.createForClass(Word);
