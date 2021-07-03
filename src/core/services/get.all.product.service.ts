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

  public async execute(pageNumber: number): Promise<Array<ProductDto>> {
    if (!pageNumber || pageNumber < 1)
      throw Exception.new(
        {
          code: StatusCode.BAD_REQUEST_ERROR,
          data: StatusCode.WRONG_PAGE_NUMBER,
        },
        GetAllProductService.name,
      );

    const pageSize: number = CommonConstants.pageSize;
    const skipNumber: number = (pageNumber - 1) * pageNumber;
    const products: Nullable<Array<Product>> =
      await this._mongoProductRepository.findPage(pageSize, skipNumber);

    if (products && products.length > 0)
      return ProductDto.newListFromProducts(products);

    throw Exception.new(
      { code: StatusCode.NOT_FOUND_DATA, data: undefined },
      GetAllProductService.name,
    );
  }
}
