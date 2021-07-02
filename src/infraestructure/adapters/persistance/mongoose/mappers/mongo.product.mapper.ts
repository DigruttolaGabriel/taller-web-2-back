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
      price: ormProduct.price,
    });
  }

  public static fromDomainToNewModel(product: Product): any {
    return {
      id: product.id,
      name: product.id,
      description: product.description,
      price: product.price,
    };
  }
}
