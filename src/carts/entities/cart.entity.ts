import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from 'src/products/entities/product.entity';

@Schema({ _id: false })
export class CartItem extends Document {
  @Prop({ type: Types.ObjectId, ref: Product.name ,required: true })
  productID: Product | Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity: number;
}

const CartItemSchema = SchemaFactory.createForClass(CartItem);

@Schema()
export class Cart extends Document {
  @Prop({ type: [CartItemSchema], required: true, default: [] })
  list: Types.Array<CartItem>;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
