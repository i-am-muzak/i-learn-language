import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  userId: string
  
  @Prop(
    {
      required: true,
      unique: true
    }
  )
  email: string;

  @Prop(
    {
      required: true
    }
  )
  password: string;

  @Prop({ default: new Date() })
  created_at: Date;
}

export const UserEntity = SchemaFactory.createForClass(User);
