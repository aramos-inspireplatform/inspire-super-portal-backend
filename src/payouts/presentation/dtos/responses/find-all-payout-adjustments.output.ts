import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '~/shared/presentation/base.dto';
export class FindAllPayoutAdjustmentsOutput extends BaseDto {
  @ApiProperty({
    example: 'b36ef5ef-e4dc-4b50-abd2-628230d1c781',
  })
  id: string;

  @ApiProperty({
    example: 'Charge fee',
  })
  description: string;

  @ApiProperty({
    example: -100.55,
  })
  amount: number;

  @ApiProperty({
    example: 100.55,
  })
  absoluteAmount: number;

  @ApiProperty({
    example: {
      id: 'a3543d46-9afd-4bda-88d6-84d0512e0c5c',
      name: 'Charge',
      slug: 'charge',
    },
  })
  adjustmentType: object;

  @ApiProperty({
    example: 'Note for charge fee',
  })
  note: string;
}
