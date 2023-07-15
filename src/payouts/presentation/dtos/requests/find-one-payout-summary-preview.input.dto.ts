import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { FindOnePayoutSummaryPreviewAdjustmentFeeInputDto } from '~/payouts/presentation/dtos/requests/find-one-payout-summary-preview-adjustment-fee.input.dto';
import { FindOnePayoutSummaryPreviewPaymentInputDto } from '~/payouts/presentation/dtos/requests/find-one-payout-summary-preview-payment.input.dto';

export class FindOnePayoutSummaryPreviewInputDto {
  @ApiProperty({
    example: 'teste-hnmkt',
  })
  @IsNotEmpty()
  @IsString()
  gTenantId: string;

  @ApiProperty({
    type: FindOnePayoutSummaryPreviewPaymentInputDto,
    isArray: true,
    example: FindOnePayoutSummaryPreviewPaymentInputDto,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayUnique((item: FindOnePayoutSummaryPreviewPaymentInputDto) => item.id)
  @Type(() => FindOnePayoutSummaryPreviewPaymentInputDto)
  payments: FindOnePayoutSummaryPreviewPaymentInputDto[];

  @ApiProperty({
    type: FindOnePayoutSummaryPreviewAdjustmentFeeInputDto,
    isArray: true,
    example: FindOnePayoutSummaryPreviewAdjustmentFeeInputDto,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FindOnePayoutSummaryPreviewAdjustmentFeeInputDto)
  adjustmentFees: FindOnePayoutSummaryPreviewAdjustmentFeeInputDto[];

  @ApiProperty({
    example: '7fcd36e4-3fec-4033-8a07-d95cd193fc7a',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  payoutId?: string;
}
