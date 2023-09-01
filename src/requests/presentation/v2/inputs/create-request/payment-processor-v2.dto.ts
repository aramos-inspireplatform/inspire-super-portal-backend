import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';
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
  isPayoutActive: boolean;
}
