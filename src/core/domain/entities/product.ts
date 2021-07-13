import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { ProductPayload } from './types/product.payload';
import { Entity } from '../../common/entities/entity';
import { Category } from '../../common/enums/category';

export class Product extends Entity {
  @IsDefined()
  @IsNumber()
  private readonly _id: number;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  private readonly _name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  private readonly _description: string;

  @IsDefined()
  @IsNumber({ maxDecimalPlaces: 2 })
  private readonly _price: number;

  @IsDefined()
  @IsEnum(Category)
  private readonly _category: Category;

  constructor(payload: ProductPayload) {
    super();
    this._id = payload.id;
    this._name = payload.name;
    this._description = payload.description;
    this._price = payload.price;
    this._category = payload.category;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get price(): number {
    return this._price;
  }

  public get category(): Category {
    return this._category;
  }

  public static async new(payload: ProductPayload): Promise<Product> {
    const product: Product = new Product(payload);
    await product.validate();

    return product;
  }
}
