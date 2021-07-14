import { ProductDto } from '../../dtos/product.dto';
import { Product } from '../../entities/product';
import { Nullable } from '../../../common/types/common.types';

export interface ProductRepositoryPort {
  find(id: number): Promise<ProductDto>;
  checkIfExist(id: number): Promise<boolean>;
  add(product: Product): Promise<Product>;
  findAll(): Promise<Nullable<Array<Product>>>;
  searchByCategory(category: string): Promise<Nullable<Array<Product>>>;
}
