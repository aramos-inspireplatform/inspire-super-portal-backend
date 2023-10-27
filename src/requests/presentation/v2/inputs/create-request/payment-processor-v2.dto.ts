import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsOptional } from 'class-validator';
import { PaymentProcessorDto } from '~/requests/presentation/dtos/modules-requests/requests/modules/payment/payment-processor.dto';

export class PaymentProcessorDtoV2 extends OmitType(PaymentProcessorDto, [
  'settlementCurrencyId',
] as const) {
  @ApiProperty({
    required: true,
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  payoutThroughInspire: boolean;

  @ApiProperty({
    required: false,
    example: 123456,
    type: Number,
  })
  @IsOptional()
  terminalId?: number;
}
