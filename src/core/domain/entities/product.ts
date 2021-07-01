import { IsDefined, IsNumber } from 'class-validator';
import { ProductPayload } from './types/product.payload';
import { Entity } from '../../common/entities/entity';

export class Product extends Entity {
  @IsDefined()
  @IsNumber()
  private readonly _id: number;

  constructor(payload: ProductPayload) {
    super();
    this._id = payload.id;
  }

  public get id(): number {
    return this._id;
  }

  public static async new(payload: ProductPayload): Promise<Product> {
    const product: Product = new Product(payload);
    await product.validate();

    return product;
  }
}
