import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Customer } from 'src/users/entities/customer.entity';

@Schema({ timestamps: { updatedAt: false } })
export class Message extends Document {
  @Prop({
    type: Types.ObjectId,
    ref: Customer.name,
    required: true,
    index: true,
  })
  emitter: Customer | Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: Customer.name,
    required: true,
    index: true,
  })
  receiver: Customer | Types.ObjectId;

  @Prop({ required: true })
  body: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
