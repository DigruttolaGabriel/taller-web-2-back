import { ProductRepositoryPort } from '../../../../../core/domain/ports/persistance/product.repository.port';
import { ProductDto } from '../../../../../core/domain/dtos/product.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductModel } from '../schemas/product.schema';
import { Model } from 'mongoose';
import { Product } from '../../../../../core/domain/entities/product';
import { Nullable } from '../../../../../core/common/types/common.types';
import { MongoProductMapper } from '../mappers/mongo.product.mapper';

@Injectable()
export class ProductRepositoryAdapter implements ProductRepositoryPort {
  constructor(
    @InjectModel(ProductModel.name) private _productModel: Model<ProductModel>,
  ) {}

  public async find(id: number): Promise<ProductDto> {
    let domainEntity: Nullable<Product> = null;
    const mongoModel: ProductModel = await this._productModel
      .findOne({
        id,
      })
      .exec();

    if (mongoModel)
      domainEntity = await MongoProductMapper.toDomainEntity(mongoModel);

    return domainEntity;
  }

  public async checkIfExist(id: number): Promise<boolean> {
    return await this._productModel.exists({
      id: id,
    });
  }

  public async add(product: Product): Promise<Product> {
    let domainEntity: Nullable<Product> = null;

    const newProductModel: ProductModel = new this._productModel(
      MongoProductMapper.fromDomainToNewModel(product),
    );

    const response: ProductModel = await newProductModel.save();

    if (response)
      domainEntity = await MongoProductMapper.toDomainEntity(response);

    return domainEntity;
  }
}
