import { Category } from '../../../common/enums/category';

export type ProductPayload = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  urlImage: string;
};
