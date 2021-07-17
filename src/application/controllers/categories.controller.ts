import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
