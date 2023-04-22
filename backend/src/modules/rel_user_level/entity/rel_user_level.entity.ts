import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type RelUserLevelDocument = RelUserLevel & Document;

@Schema()
export class RelUserLevel {
  @Prop(
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
  )
  user_id: string

  @Prop(
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "levels"
    }
  )
  level_id: string

  @Prop()
  is_completed: boolean

  @Prop()
  completed_at: Date

  @Prop()
  created_at: Date
}

export const RelUserLevelEntity = SchemaFactory.createForClass(RelUserLevel);
