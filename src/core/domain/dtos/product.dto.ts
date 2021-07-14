import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Product } from '../entities/product';
import { Category } from '../../common/enums/category';

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

  @Expose({ name: '_category' })
  public category: Category;

  @Expose({ name: '_urlImage' })
  public urlImage: string;

  public static newFromProduct(product: Product): ProductDto {
    return plainToClass(ProductDto, product);
  }

  public static newListFromProducts(
    products: Array<Product>,
  ): Array<ProductDto> {
    return products.map((p) => this.newFromProduct(p));
  }
}
