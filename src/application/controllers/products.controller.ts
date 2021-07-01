import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { GetProductService } from '../../core/services/get.product.service';
import { ProductDto } from '../../core/domain/dtos/product.dto';
import { GetProductAdapter } from '../../infraestructure/adapters/usecase/get.product.adapter';
import { AuthGuard } from '../guards/auth.guard';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('/product')
@ApiTags(' Product Controller')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized access. Invalid token.' })
export class ProductsController {
  constructor(private readonly _getProductService: GetProductService) {}

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
}
