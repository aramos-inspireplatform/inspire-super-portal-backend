import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { BaseDto } from '~/shared/presentation/base.dto';
export class FindPayoutPaymentOutput extends BaseDto {
  @Expose()
  @ApiProperty({
    example: '74deb067-2bf6-45b1-991d-a0f22ab0ae3a',
  })
  @IsUUID()
  id: string;

  @Expose()
  @ApiProperty({ example: new Date() })
  date: Date;

  @Expose()
  @ApiProperty({
    example: 'Succeeded',
  })
  status: string;

  @Expose()
  @ApiProperty({
    example: 2.75,
  })
  amount: number;

  @Expose()
  @ApiProperty({
    example: 2.69,
  })
  receivedAmount: number;

  @Expose()
  @ApiProperty({
    example: 0.71995,
  })
  feeAmount: number;

  @Expose()
  @ApiProperty({
    example: 2.03005,
  })
  payableAmount: number;

  @Expose()
  @ApiProperty({
    example: 0.30995,
  })
  profitAmount: number;

  @Expose()
  @ApiProperty({
    example: 'Bexs',
  })
  paymentProcessorName: string;

  @Expose()
  @ApiProperty({
    example: 'Credit card',
  })
  paymentMethodName: string;

  @Expose()
  @ApiProperty({
    example: 'MasterCard',
  })
  creditCardBrandName: string;

  @Expose()
  @ApiProperty({
    example: 1,
  })
  installments: number;

  @Expose()
  @ApiProperty({
    example: 'ef05df5e1e744399b2d85cf3fffec254V1',
  })
  paymentProcessorId: string;

  @Expose()
  @ApiProperty({
    example: 'automatic',
  })
  reconciliationMethod: string;

  @Expose()
  @ApiProperty({
    example: 'ef05df5e1e744399',
  })
  paymentProcessorConfirmation: string;
}
