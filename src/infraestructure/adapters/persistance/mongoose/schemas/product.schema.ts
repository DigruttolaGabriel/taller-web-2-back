import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

@Schema()
export class ProductModel extends Document {
  @Prop({ required: true })
  public id: number;

  @Prop({ required: true })
  public name: string;

  @Prop({ required: true })
  public description: string;

  @Prop({ required: true })
  public price: number;
}

export const productSchema: mongoose.Schema<ProductModel> =
  SchemaFactory.createForClass(ProductModel);
