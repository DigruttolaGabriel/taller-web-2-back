import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Product } from '../entities/product';

@Exclude()
export class ProductDto {
  @Expose({ name: '_id' })
  public id: number;

  @Expose({ name: '_name' })
  public name: string;

  @Expose({ name: '_description' })
  public description: string;

  @Expose({ name: '_price' })
  public price: number;

  public static newFromProduct(product: Product): ProductDto {
    return plainToClass(ProductDto, product);
  }
}
