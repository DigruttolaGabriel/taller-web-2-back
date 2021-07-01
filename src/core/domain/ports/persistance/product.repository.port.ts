import { ProductDto } from '../../dtos/product.dto';

export interface ProductRepositoryPort {
  find(id: number): Promise<ProductDto>;
  checkIfExist(id: number): Promise<boolean>;
}
