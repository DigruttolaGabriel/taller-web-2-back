import { Module } from '@nestjs/common';
import { CategoriesController } from '../controllers/categories.controller';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [],
})
export class CategoryModule {}
