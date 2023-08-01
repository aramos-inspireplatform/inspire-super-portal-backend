import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { DateRage } from '~/shared/infra/nestjs/decorators/data-range.dto.decorator';

export class ReconciliateBexsInputDto {
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
}
