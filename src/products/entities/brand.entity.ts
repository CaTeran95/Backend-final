import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Product, ProductSchema } from "./product.entity";

@Schema()
export class Brand extends Document {
  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  image: string;
  
  @Prop()
  website?: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);