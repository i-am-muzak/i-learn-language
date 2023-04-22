import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LanguageDocument = Language & Document;

@Schema()
export class Language {
  @Prop(
    {
        unique: true
    }
  )
  title: string;

  @Prop()
  is_active: boolean

  @Prop()
  created_at: Date
}

export const LanguageEntity = SchemaFactory.createForClass(Language);
