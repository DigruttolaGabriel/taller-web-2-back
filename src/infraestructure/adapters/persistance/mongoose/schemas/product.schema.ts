import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema()
export class ProductModel extends Document {
  @Prop({ required: true })
  public id: number;
}

export const productSchema: mongoose.Schema<ProductModel> =
  SchemaFactory.createForClass(ProductModel);
