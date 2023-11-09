import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDefined,
  ValidateNested,
  IsOptional,
} from 'class-validator';
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

  @ApiProperty({ example: ['b50e2d69-e24d-4d04-bb0f-1e4bcffb58e4'] })
  @IsArray()
  @IsOptional()
  paymentMethodsIdsAsDualPricing: string[];
}
