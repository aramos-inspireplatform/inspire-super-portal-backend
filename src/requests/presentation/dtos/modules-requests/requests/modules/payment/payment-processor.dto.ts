import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsUUID,
  IsBoolean,
  IsNumber,
  IsPositive,
  IsString,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsDefined,
  ValidateIf,
} from 'class-validator';
import { PaymentMethodsDto } from '~/requests/presentation/dtos/modules-requests/requests/modules/payment/payment-methods.dto';

export class PaymentProcessorDto {
  @ApiProperty({
    required: true,
    example: 'd25a341a-37a6-4aec-b55c-53cc5440c927',
  })
  @IsNotEmpty()
  @IsUUID()
  paymentGatewayId: string;

  @ApiProperty({
    required: true,
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  minimumRequiredAmount: number;

  @ApiProperty({
    required: true,
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  allowInstallments: boolean;

  @ApiProperty({
    required: true,
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isSplitPaymentAllowed: boolean;

  @ApiProperty({
    required: true,
    example: '90261c51-ed8a-4859-b193-395a7375b903',
  })
  @IsNotEmpty()
  @IsUUID()
  settlementCurrencyId: string;

  @ApiProperty({
    required: true,
    example: 'aa8501e1-a828-4e94-aff6-b7aab6760039',
  })
  @ValidateIf((obj: PaymentProcessorDto) => !obj.apiSecretKey)
  @IsNotEmpty()
  @IsString()
  apiAccessKey: string;

  @ApiProperty({
    required: true,
    example: 'aa8501e1-a828-4e94-aff6-b7aab6760039',
  })
  @ValidateIf((obj: PaymentProcessorDto) => !obj.apiAccessKey)
  @IsNotEmpty()
  @IsString()
  apiSecretKey: string;

  @ApiProperty({ type: PaymentMethodsDto, isArray: true })
  @IsDefined()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => PaymentMethodsDto)
  paymentMethods: PaymentMethodsDto[];

  @ApiProperty({
    required: true,
    example: ['90261c51-ed8a-4859-b193-395a7375b903'],
  })
  @IsNotEmpty()
  @IsArray()
  @IsUUID(undefined, { each: true })
  allowedCountriesIds: string[];

  @ApiProperty({
    required: true,
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isDefault: boolean;
}
