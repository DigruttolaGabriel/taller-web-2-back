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
import { GetAllProductService } from '../../core/services/get.all.product.service';
import { SearchProductsByCategoryService } from '../../core/services/search.products.by.category.service';
import { Category } from '../../core/common/enums/category';

@UseGuards(AuthGuard)
@Controller('/taller-web-2/api')
@ApiTags('Categories Controller')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: 'Unauthorized access. Invalid token.' })
export class CategoriesController {
  @Get('/categories')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get all categories.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'No data found.' })
  public getAll(): Array<string> {
    return Object.keys(Category).map((key) => Category[key]);
  }
}
