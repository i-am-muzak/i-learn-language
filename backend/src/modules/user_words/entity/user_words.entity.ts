import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserWordsDocument = UserWords & Document;

@Schema()
export class UserWords {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'words',
  })
  word_id: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'users',
  })
  user_id: string;
}

export const UserWordsEntity = SchemaFactory.createForClass(UserWords);
