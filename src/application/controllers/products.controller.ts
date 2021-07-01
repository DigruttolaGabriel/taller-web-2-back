import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetProductService } from '../../core/services/get.product.service';
import { ProductDto } from '../../core/domain/dtos/product.dto';
import { GetProductAdapter } from '../../infraestructure/adapters/usecase/get.product.adapter';
import { AuthGuard } from '../guards/auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ProductHttpBody } from '../documentation/product.http.body';
import { CreateProductAdapter } from 'src/infraestructure/adapters/usecase/create.product.adapter';
import { CreateProductService } from '../../core/services/create.product.service';

@UseGuards(AuthGuard)
@Controller('/taller-web-2/api/product')
@ApiTags(' Product Controller')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized access. Invalid token.' })
export class ProductsController {
  constructor(
    private readonly _getProductService: GetProductService,
    private readonly _createProductService: CreateProductService,
  ) {}

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get product by specific id.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No data found.' })
  public async get(@Param('id', ParseIntPipe) id: number): Promise<ProductDto> {
    const adapter: GetProductAdapter = await GetProductAdapter.new({
      id: id,
    });

    return await this._getProductService.execute(adapter);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: ProductHttpBody })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created new product.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Error to create new product.',
  })
  public async post(
    @Body() productHttpBody: ProductHttpBody,
  ): Promise<ProductDto> {
    const adapter: CreateProductAdapter = await CreateProductAdapter.new({
      id: productHttpBody.id,
      name: productHttpBody.name,
      description: productHttpBody.description,
      prize: productHttpBody.prize,
    });

    return await this._createProductService.execute(adapter);
  }
}
