import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export enum MessageOrigin {
  USER = 'user',
  SYSTEM = 'system',
}

@Schema({ timestamps: { updatedAt: false } })
export class Message extends Document {
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: User | Types.ObjectId;

  @Prop({ type: String, required: true })
  origin: MessageOrigin;

  @Prop({ required: true })
  body: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
