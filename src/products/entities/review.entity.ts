import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Name, NameSchema } from 'src/users/entities/name.entity';

@Schema({ _id: false })
export class Review extends Document {
  @Prop({ type: NameSchema })
  user: Name;

  @Prop({ type: Number, required: true, index: true })
  rating: number;

  @Prop({ required: true })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
