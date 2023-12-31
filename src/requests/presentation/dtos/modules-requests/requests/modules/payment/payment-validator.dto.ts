import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsOptional,
  ValidateNested,
  ArrayUnique,
} from 'class-validator';
import { PaymentProcessorDto } from '~/requests/presentation/dtos/modules-requests/requests/modules/payment/payment-processor.dto';
import { VaultDto } from '~/requests/presentation/dtos/modules-requests/requests/modules/payment/vault.dto';
import { WebHookDto } from '~/requests/presentation/dtos/modules-requests/requests/modules/payment/web-hook.dto';

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
  @IsOptional()
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => WebHookDto)
  @ArrayUnique((item: WebHookDto) => item.url)
  webHooks?: WebHookDto[];
}
