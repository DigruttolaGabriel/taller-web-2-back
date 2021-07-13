import { Exclude, Expose, plainToClass } from 'class-transformer';
import { UsecaseValidatableAdapter } from '../../../core/common/adapters/usecase/usecase.validatable.adapter';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { CreateProductPort } from '../../../core/domain/ports/usecase/create.product.port';
import { Category } from '../../../core/common/enums/category';

@Exclude()
export class CreateProductAdapter
  extends UsecaseValidatableAdapter
  implements CreateProductPort
{
  @Expose()
  @IsNumber()
  public id: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public description: string;

  @Expose()
  @IsNumber({ maxDecimalPlaces: 2 })
  public price: number;

  @Expose()
  @IsDefined()
  @IsEnum(Category)
  public category: Category;

  public static async new(
    payload: CreateProductPort,
  ): Promise<CreateProductAdapter> {
    const adapter: CreateProductAdapter = plainToClass(
      CreateProductAdapter,
      payload,
    );
    await adapter.validate();

    return adapter;
  }
}
