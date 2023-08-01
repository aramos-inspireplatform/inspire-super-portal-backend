import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { DateRage } from '~/shared/infra/nestjs/decorators/data-range.dto.decorator';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';

export class FindAllPaymentsPeriodPagedInputDto extends CommonPaginateDto {
  @ApiProperty({
    example: 'teste-hnmkt',
  })
  @IsNotEmpty()
  @IsString()
  gTenantId: string;

  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  @IsDateString()
  periodStartDate: Date;

  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  @IsDateString()
  @DateRage('periodStartDate', process.env.PAYOUT_MAX_PERIOD_RANGE ?? null)
  periodEndDate: Date;

  @ApiProperty({
    example: 'USD',
    //enum: ['USD', 'BRL'],
  })
  @IsNotEmpty()
  @IsString()
  settlementCurrencyIsoCode: string;

  @ApiProperty({
    example: '7fcd36e4-3fec-4033-8a07-d95cd193fc7a',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  payoutId?: string;
}
