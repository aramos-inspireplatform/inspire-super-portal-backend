import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { PaymentProcessorDto } from '~/modules-requests/presentation/dto/input/modules/payment/payment-processor.dto';
import { VaultDto } from '~/modules-requests/presentation/dto/input/modules/payment/vault.dto';
import { WebHookDto } from '~/modules-requests/presentation/dto/input/modules/payment/web-hook.dto';

export class PaymentProviderValidatorRequestDto {
  @ApiProperty({ type: VaultDto, example: VaultDto })
  @ValidateNested()
  @IsDefined()
  @Type(() => VaultDto)
  vault: VaultDto;

  @ApiProperty({ type: PaymentProcessorDto, example: PaymentProcessorDto })
  @ValidateNested()
  @IsDefined()
  @Type(() => PaymentProcessorDto)
  paymentProcessor: PaymentProcessorDto;

  @ApiProperty({ type: WebHookDto, isArray: true, example: WebHookDto })
  @IsNotEmpty()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => WebHookDto)
  webHooks: WebHookDto[];
}
