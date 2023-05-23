import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type WordSynonymDocument = WordSynonym & Document;

@Schema()
export class WordSynonym {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'words',
  })
  word_id: string;

  @Prop()
  word: string;
}

export const WordSynonymEntity = SchemaFactory.createForClass(WordSynonym);
