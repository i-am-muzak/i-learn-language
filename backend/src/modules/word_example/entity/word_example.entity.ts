import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type WordExampleDocument = WordExample & Document;

@Schema()
export class WordExample {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'words',
  })
  word_id: string;

  @Prop()
  example: string;
}

export const WordExampleEntity = SchemaFactory.createForClass(WordExample);
