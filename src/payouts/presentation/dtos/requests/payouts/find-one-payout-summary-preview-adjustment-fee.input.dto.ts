import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class FindOnePayoutSummaryPreviewAdjustmentFeeInputDto {
  @ApiProperty({
    example: '7fcd36e4-3fec-4033-8a07-d95cd193fc7a',
  })
  @IsNotEmpty()
  @IsUUID()
  adjustmentTypeId: string;

  @ApiProperty({ example: 5.32 })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
