import { ProductModel } from '../schemas/product.schema';
import { Product } from '../../../../../core/domain/entities/product';

export class MongoProductMapper {
  public static async toDomainEntity(
    ormProduct: ProductModel,
  ): Promise<Product> {
    return await Product.new({
      id: ormProduct.id,
    });
  }

  public static fromDomainToNewModel(product: Product): any {
    return {
      id: product.id,
    };
  }
}
