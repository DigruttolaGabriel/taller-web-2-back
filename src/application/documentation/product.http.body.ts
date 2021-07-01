import { ApiProperty } from '@nestjs/swagger';

export class ProductHttpBody {
  @ApiProperty({ type: Number, required: true, minimum: 1 })
  public readonly id: number;
  @ApiProperty({ type: String, required: true })
  public readonly name: string;
  @ApiProperty({ type: String, required: true })
  public readonly description: string;
  @ApiProperty({ type: Number, required: true, minimum: 1 })
  public readonly prize: number;
}
