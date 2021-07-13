import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../core/common/enums/category';

export class ProductHttpBody {
  @ApiProperty({ type: Number, required: true, minimum: 1 })
  public readonly id: number;
  @ApiProperty({ type: String, required: true })
  public readonly name: string;
  @ApiProperty({ type: String, required: true })
  public readonly description: string;
  @ApiProperty({ type: Number, required: true, minimum: 1 })
  public readonly price: number;
  @ApiProperty({ enum: Category, required: true })
  public readonly category: Category;
}
