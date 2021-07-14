import { ProductUsecase } from '../usecase/product.usecase';
import { ProductDto } from '../domain/dtos/product.dto';
import { ProductRepositoryAdapter } from '../../infraestructure/adapters/persistance/mongoose/repository/product.repository.adapter';
import { Nullable } from '../common/types/common.types';
import { Product } from '../domain/entities/product';
import { Exception } from '../common/exceptions/exception';
import { StatusCode } from '../common/codes/status.code';
import { Injectable } from '@nestjs/common';
import { CommonConstants } from '../common/enums/common.constants';

@Injectable()
export class GetAllProductService
  implements ProductUsecase<number, Array<ProductDto>>
{
  constructor(
    private readonly _mongoProductRepository: ProductRepositoryAdapter,
  ) {}

  public async execute(): Promise<Array<ProductDto>> {
    const products: Nullable<Array<Product>> =
      await this._mongoProductRepository.findAll();

    if (products && products.length > 0)
      return ProductDto.newListFromProducts(products);

    throw Exception.new(
      { code: StatusCode.NOT_FOUND_DATA, data: undefined },
      GetAllProductService.name,
    );
  }
}
