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
} from 'class-validator';
import { PaymentMethodsDto } from '~/modules-requests/presentation/dto/input/modules/payment/payment-methods.dto';

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
    example: '90261c51-ed8a-4859-b193-395a7375b903',
  })
  @IsNotEmpty()
  @IsUUID()
  settlementCurrencyId: string;

  @ApiProperty({
    required: true,
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  isDefault: boolean;

  @ApiProperty({
    required: true,
    example: 'aa8501e1-a828-4e94-aff6-b7aab6760039',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  minimunRequiredAmount: number;

  @ApiProperty({
    required: true,
    example: 'aa8501e1-a828-4e94-aff6-b7aab6760039',
  })
  @IsNotEmpty()
  @IsString()
  apiAccessKey: string;

  @ApiProperty({
    required: true,
    example: 'aa8501e1-a828-4e94-aff6-b7aab6760039',
  })
  @IsNotEmpty()
  @IsString()
  apiSecretKey: string;

  @ApiProperty({ type: PaymentMethodsDto, isArray: true })
  paymentMethods: PaymentMethodsDto[];

  @ApiProperty({
    required: true,
    example: '90261c51-ed8a-4859-b193-395a7375b903',
  })
  @IsNotEmpty()
  @IsArray()
  @IsUUID(undefined, { each: true })
  allowedCountriesIds: string[];
}
