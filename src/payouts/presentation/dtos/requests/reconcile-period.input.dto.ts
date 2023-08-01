import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { DateRage } from '~/shared/infra/nestjs/decorators/data-range.dto.decorator';

export class ReconcilePeriodInputDto {
  @ApiProperty({
    example: 'teste-hnmkt',
  })
  @IsNotEmpty()
  @IsString()
  gTenantId: string;

  @ApiProperty({ example: 'pending' })
  @IsOptional()
  @IsString()
  status: string;

  @ApiProperty({ example: '2023-07-01T00:00:00.000-0300' })
  @IsNotEmpty()
  @IsDateString()
  periodStartDate: Date;

  @ApiProperty({ example: '2023-01-10T23:59:59.999-0300' })
  @IsNotEmpty()
  @IsDateString()
  @DateRage('periodStartDate', process.env.PAYOUT_MAX_PERIOD_RANGE ?? null)
  periodEndDate: Date;
}
