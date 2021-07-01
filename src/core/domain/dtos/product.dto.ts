import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Product } from '../entities/product';

@Exclude()
export class ProductDto {
  @Expose({ name: '_id' })
  public id: number;

  public static newFromProduct(product: Product): ProductDto {
    return plainToClass(ProductDto, product);
  }
}
