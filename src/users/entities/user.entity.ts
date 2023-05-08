import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { Name, NameSchema } from './name.entity';

// export enum Role {
//   ADMIN = 'admin',
//   STAFF = 'staff',
// }

@Schema()
export class User extends Document {
  @Prop({ type: NameSchema })
  name: Name;

  @Prop({ required: true, index: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  avatar: string;

  @Prop({ required: true })
  alias: string;

  @Prop({ type: Date, required: true })
  birthday: Date;
  
  // @Prop({ required: true, default: 'staff' })
  // role: Role;

  @Prop({ type: Boolean, required: true, default: false })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
