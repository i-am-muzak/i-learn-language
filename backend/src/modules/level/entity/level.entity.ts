import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type LevelDocument = Level & Document;

@Schema()
export class Level {
  @Prop(
    {
        unique: true
    }
  )
  title: string;

  @Prop(
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "languages"
    }
  )
  language_id: string

  @Prop()
  value: number

  @Prop()
  is_active: boolean
}

export const LevelEntity = SchemaFactory.createForClass(Level);
