import { ProductUsecase } from '../usecase/product.usecase';
import { ProductDto } from '../domain/dtos/product.dto';
import { ProductRepositoryAdapter } from '../../infraestructure/adapters/persistance/mongoose/repository/product.repository.adapter';
import { Product } from '../domain/entities/product';
import { Exception } from '../common/exceptions/exception';
import { StatusCode } from '../common/codes/status.code';
import { Injectable } from '@nestjs/common';
import { CreateProductPort } from '../domain/ports/usecase/create.product.port';

@Injectable()
export class CreateProductService
  implements ProductUsecase<CreateProductPort, ProductDto>
{
  constructor(
    private readonly _mongoProductRepository: ProductRepositoryAdapter,
  ) {}

  public async execute(payload: CreateProductPort): Promise<ProductDto> {
    const exist: boolean = await this._mongoProductRepository.checkIfExist(
      payload.id,
    );

    if (exist) {
      throw Exception.new(
        {
          code: StatusCode.BAD_REQUEST_ERROR,
          data: StatusCode.ENTITY_ALREADY_EXISTS_ERROR,
        },
        CreateProductService.name,
      );
    }

    const product: Product = await Product.new({
      id: payload.id,
      name: payload.name,
      description: payload.description,
      price: payload.price,
    });

    const newProduct: Product = await this._mongoProductRepository.add(product);

    if (newProduct) return ProductDto.newFromProduct(newProduct);

    throw Exception.new(
      { code: StatusCode.INTERNAL_SERVER_ERROR, data: undefined },
      CreateProductService.name,
    );
  }
}
