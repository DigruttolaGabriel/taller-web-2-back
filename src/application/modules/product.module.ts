import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductModel,
  productSchema,
} from '../../infraestructure/adapters/persistance/mongoose/schemas/product.schema';
import { ProductsController } from '../controllers/products.controller';
import { GetProductAdapter } from '../../infraestructure/adapters/usecase/get.product.adapter';
import { GetProductService } from '../../core/services/get.product.service';
import { ProductRepositoryAdapter } from '../../infraestructure/adapters/persistance/mongoose/repository/product.repository.adapter';
import { CreateProductService } from '../../core/services/create.product.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: productSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [
    ProductRepositoryAdapter,
    GetProductService,
    CreateProductService,
  ],
})
export class ProductModule {}
