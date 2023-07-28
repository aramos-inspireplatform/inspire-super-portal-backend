import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';
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

  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  periodStartDate: Date;

  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  @IsDate()
  @DateRage('periodStartDate', process.env.PAYOUT_MAX_PERIOD_RANGE ?? null)
  @Type(() => Date)
  periodEndDate: Date;
}
