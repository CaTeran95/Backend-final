import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Category } from "./category.entity";
import { Brand } from "./brand.entity";
import { Review, ReviewSchema } from "./review.entity";

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
  category: Category | Types.ObjectId; 
  
  @Prop({ type: Types.ObjectId, ref: Brand.name, required: true })
  brand: Brand | Types.ObjectId; 

  @Prop({ type: [String], required: true })
  images: Types.Array<string>;

  @Prop({ type: [ReviewSchema] })
  reviews: Types.Array<Review>;

  @Prop({ type: Number, required: true })
  stock: number;
  
  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Boolean, required: true })
  active: boolean;

  @Prop({ required: true })
  condition: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product)