import { ProductUsecase } from '../usecase/product.usecase';
import { GetProductPort } from '../domain/ports/usecase/get.product.port';
import { ProductDto } from '../domain/dtos/product.dto';
import { ProductRepositoryAdapter } from '../../infraestructure/adapters/persistance/mongoose/repository/product.repository.adapter';
import { Nullable } from '../common/types/common.types';
import { Product } from '../domain/entities/product';
import { Exception } from '../common/exceptions/exception';
import { StatusCode } from '../common/codes/status.code';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetProductService
  implements ProductUsecase<GetProductPort, ProductDto>
{
  constructor(
    private readonly _mongoProductRepository: ProductRepositoryAdapter,
  ) {}

  public async execute(payload: GetProductPort): Promise<ProductDto> {
    let product: Nullable<Product> = null;
    const exist: boolean = await this._mongoProductRepository.checkIfExist(
      payload.id,
    );

    if (exist) {
      // @ts-ignore
      product = await this._mongoProductRepository.find(payload.id);
    }

    if (product) return ProductDto.newFromProduct(product);

    throw Exception.new(
      { code: StatusCode.NOT_FOUND_DATA, data: undefined },
      GetProductService.name,
    );
  }
}
