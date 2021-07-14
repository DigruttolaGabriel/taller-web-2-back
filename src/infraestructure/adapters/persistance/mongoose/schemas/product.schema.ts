import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';
import { Category } from 'src/core/common/enums/category';

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

  @Prop({ required: true })
  public category: Category;

  @Prop({ required: true })
  public urlImage: string;
}

export const productSchema: mongoose.Schema<ProductModel> =
  SchemaFactory.createForClass(ProductModel);
