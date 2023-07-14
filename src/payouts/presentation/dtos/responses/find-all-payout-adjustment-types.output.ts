import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '~/shared/presentation/base.dto';

export class FindAllPayoutAdjustmentTypesOutput extends BaseDto {
  @ApiProperty({
    example: '5db1622f-88a3-4b82-93cb-26221e4ac414',
  })
  id: string;

  @ApiProperty({
    example: 'Credit',
  })
  name: string;

  @ApiProperty({
    example: 'credit',
  })
  slug: string;
}
