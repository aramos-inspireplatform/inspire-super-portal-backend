import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

class FindOnePayoutSummaryPreviewFeeOutputDto {
  @Expose()
  @ApiProperty({
    example: 'Platform Fees',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: 'Bexs',
  })
  paymentProcessor: string;

  @Expose()
  @ApiProperty({
    example: 'Credit Card',
    nullable: true,
  })
  paymentMethod: string;

  @Expose()
  @ApiProperty({
    example: 'Elo',
    nullable: true,
  })
  cardBrand: string;

  @Expose()
  @ApiProperty({
    example: new Date(),
  })
  startDate: Date;

  @Expose()
  @ApiProperty({
    example: new Date(),
  })
  endDate: Date;

  @Expose()
  @ApiProperty({
    example: '2x',
  })
  installments: string;

  @Expose()
  @ApiProperty({
    example: '$',
  })
  currency: string;

  @Expose()
  @ApiProperty({
    example: 0.2,
  })
  amount: number;
}

class FindOnePayoutSummaryPreviewFeeGroupOutputDto {
  @Expose()
  @ApiProperty({
    example: 'Platform Fees',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: new Date(),
  })
  startDate: Date;

  @Expose()
  @ApiProperty({
    example: new Date(),
  })
  endDate: Date;

  @Expose()
  @ApiProperty({
    type: FindOnePayoutSummaryPreviewFeeOutputDto,
    isArray: true,
  })
  fees: FindOnePayoutSummaryPreviewFeeOutputDto[];
}

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
    type: FindOnePayoutSummaryPreviewFeeGroupOutputDto,
    isArray: true,
  })
  feeGroups: FindOnePayoutSummaryPreviewFeeGroupOutputDto[];
}
