import { ApiProperty } from '@nestjs/swagger';

export class ProductHttpBody {
  @ApiProperty({ type: Number, required: true, minimum: 1 })
  public readonly id: number;
}
