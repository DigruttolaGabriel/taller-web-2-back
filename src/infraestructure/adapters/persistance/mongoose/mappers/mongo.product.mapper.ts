import { ProductModel } from '../schemas/product.schema';
import { Product } from '../../../../../core/domain/entities/product';

export class MongoProductMapper {
  public static async toDomainEntity(
    ormProduct: ProductModel,
  ): Promise<Product> {
    return await Product.new({
      id: ormProduct.id,
      name: ormProduct.name,
      description: ormProduct.description,
      prize: ormProduct.prize,
    });
  }

  public static fromDomainToNewModel(product: Product): any {
    return {
      id: product.id,
      name: product.id,
      description: product.description,
      prize: product.prize,
    };
  }
}
