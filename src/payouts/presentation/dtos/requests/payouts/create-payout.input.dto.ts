import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  IsArray,
  ArrayUnique,
  ValidateIf,
  IsString,
  ArrayMinSize,
  ArrayMaxSize,
  IsEnum,
  ValidateNested,
  IsBoolean,
} from 'class-validator';
import { CreatePayoutCommandType } from '~/payouts/domain/enums';
import { CreatePayoutAdjustmentFeeInputDto } from '~/payouts/presentation/dtos/requests/adjustments';

const MAX_ACCEPTED_PAYMENTS = 1000 * 10;

export class CreatePayoutInputDto {
  @ApiProperty({
    example: 'teste-hnmkt',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  gTenantId: string;

  @ApiProperty({
    example: CreatePayoutCommandType.DRAFT,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(CreatePayoutCommandType)
  command: CreatePayoutCommandType;

  @ApiProperty({
    example: '2023-07-01T10:30:00-03:00',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  periodStartDate: Date;

  @ApiProperty({
    example: '2023-07-01T10:30:00-03:00',
    required: true,
  })
  @IsNotEmpty()
  @IsDateString()
  periodEndDate: Date;

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  selectAllPayments: boolean;

  @ApiProperty({
    example: ['7fcd36e4-3fec-4033-8a07-d95cd193fc7a'],
  })
  @ValidateIf(
    (item: CreatePayoutInputDto) =>
      item.command === CreatePayoutCommandType.PROCESS &&
      !item.selectAllPayments,
  )
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(MAX_ACCEPTED_PAYMENTS)
  @ArrayUnique()
  @IsUUID(undefined, { each: true })
  selectedPayments: string[];

  @ApiProperty({
    type: CreatePayoutAdjustmentFeeInputDto,
    example: CreatePayoutAdjustmentFeeInputDto,
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePayoutAdjustmentFeeInputDto)
  @ApiPropertyOptional()
  adjustmentFees: CreatePayoutAdjustmentFeeInputDto[];
}
