import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class FindOnePayoutSummaryPreviewOutputDto {
  @Expose()
  @ApiProperty({
    example: 1000.0,
  })
  incomeAmount: number;

  @Expose()
  @ApiProperty({
    example: 950.0,
  })
  receivedAmount: number;

  @Expose()
  @ApiProperty({
    example: 0,
  })
  feeAmount: number;

  @Expose()
  @ApiProperty({
    example: 900.0,
  })
  payableAmount: number;

  @Expose()
  @ApiProperty({
    example: 50.0,
  })
  profitAmount: number;

  @Expose()
  @ApiProperty({
    example: 1300,
  })
  paymentsReceivedCount: number;

  @Expose()
  @ApiProperty({
    example: 1300,
  })
  paymentsFoundCount: number;

  @Expose()
  @ApiProperty({
    example: -50.0,
  })
  adjustmentFeesAmount: number;

  @Expose()
  @ApiProperty({
    example: 5,
  })
  adjustmentFeesReceivedCount: number;

  @Expose()
  @ApiProperty({
    example: 5,
  })
  adjustmentFeesFoundCount: number;

  @Expose()
  @ApiProperty({
    example: [{}],
    isArray: true,
  })
  feeGroups: string[];
}
