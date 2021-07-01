import { Exclude, Expose, plainToClass } from 'class-transformer';
import { UsecaseValidatableAdapter } from '../../../core/common/adapters/usecase/usecase.validatable.adapter';
import { IsNumber } from 'class-validator';
import { CreateProductPort } from '../../../core/domain/ports/usecase/create.product.port';

@Exclude()
export class CreateProductAdapter
  extends UsecaseValidatableAdapter
  implements CreateProductPort
{
  @Expose()
  @IsNumber()
  public id: number;

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
