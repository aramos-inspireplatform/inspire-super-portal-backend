import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, ValidateNested } from 'class-validator';
import { PaymentProviderValidatorRequestDto } from '~/requests/presentation/dtos/modules-requests/requests/modules/payment/payment-validator.dto';
import { PaymentProcessorDtoV2 } from '~/requests/presentation/v2/inputs/create-request/payment-processor-v2.dto';

export class PaymentProviderValidatorRequestDtoV2 extends OmitType(
  PaymentProviderValidatorRequestDto,
  ['paymentProcessor'] as const,
) {
  @ApiProperty({ type: PaymentProcessorDtoV2, example: PaymentProcessorDtoV2 })
  @ValidateNested()
  @IsDefined()
  @Type(() => PaymentProcessorDtoV2)
  paymentProcessor: PaymentProcessorDtoV2;
}
