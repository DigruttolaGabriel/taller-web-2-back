import { ProductUsecase } from '../usecase/product.usecase';
import { ProductDto } from '../domain/dtos/product.dto';
import { ProductRepositoryAdapter } from '../../infraestructure/adapters/persistance/mongoose/repository/product.repository.adapter';
import { Nullable } from '../common/types/common.types';
import { Product } from '../domain/entities/product';
import { Exception } from '../common/exceptions/exception';
import { StatusCode } from '../common/codes/status.code';
import { Injectable } from '@nestjs/common';
import { CommonConstants } from '../common/enums/common.constants';
import { Category } from '../common/enums/category';

@Injectable()
export class SearchProductsByCategoryService
  implements ProductUsecase<Category, Array<ProductDto>>
{
  constructor(
    private readonly _mongoProductRepository: ProductRepositoryAdapter,
  ) {}

  public async execute(category: Category): Promise<Array<ProductDto>> {
    if (!category)
      throw Exception.new(
        {
          code: StatusCode.BAD_REQUEST_ERROR,
          data: StatusCode.WRONG_CATEGORY,
        },
        SearchProductsByCategoryService.name,
      );
    const products: Nullable<Array<Product>> =
      await this._mongoProductRepository.searchByCategory(category);

    if (products && products.length > 0)
      return ProductDto.newListFromProducts(products);

    throw Exception.new(
      { code: StatusCode.NOT_FOUND_DATA, data: undefined },
      SearchProductsByCategoryService.name,
    );
  }
}
