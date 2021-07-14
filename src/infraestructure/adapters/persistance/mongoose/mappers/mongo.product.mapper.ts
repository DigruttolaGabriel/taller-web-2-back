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
      category: ormProduct.category,
      urlImage: ormProduct.urlImage,
    });
  }

  public static fromDomainToNewModel(product: Product): any {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      urlImage: product.urlImage,
    };
  }

  public static toDomainListEntities(
    ormProducts: Array<ProductModel>,
  ): Promise<Array<Product>> {
    return Promise.all(ormProducts.map((p) => this.toDomainEntity(p)));
  }
}
