import { Category } from '../../../common/enums/category';

export interface CreateProductPort {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
}
