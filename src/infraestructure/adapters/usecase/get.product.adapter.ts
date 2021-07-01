import { Exclude, Expose, plainToClass } from 'class-transformer';
import { GetProductPort } from '../../../core/domain/ports/usecase/get.product.port';
import { UsecaseValidatableAdapter } from '../../../core/common/adapters/usecase/usecase.validatable.adapter';
import { IsNumber } from 'class-validator';

@Exclude()
export class GetProductAdapter
  extends UsecaseValidatableAdapter
  implements GetProductPort
{
  @Expose()
  @IsNumber()
  public id: number;

  public static async new(payload: GetProductPort): Promise<GetProductAdapter> {
    const adapter: GetProductAdapter = plainToClass(GetProductAdapter, payload);
    await adapter.validate();

    return adapter;
  }
}
