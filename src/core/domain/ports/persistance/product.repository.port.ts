import { ProductDto } from '../../dtos/product.dto';
import { Product } from '../../entities/product';
import { Nullable } from '../../../common/types/common.types';

export interface ProductRepositoryPort {
  find(id: number): Promise<ProductDto>;
  checkIfExist(id: number): Promise<boolean>;
  add(product: Product): Promise<Product>;
  findPage(
    pageSize: number,
    skipSize: number,
  ): Promise<Nullable<Array<Product>>>;
}
