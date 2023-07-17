import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsDate,
  IsOptional,
} from 'class-validator';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';

<<<<<<< HEAD:src/payouts/presentation/dtos/requests/find-period-payout-payments.input.dto.ts
export class FindPeriodPayoutPaymentsInputDto extends CommonPaginateDto {
=======
export class FindAllPaymentsPeriodPagedInputDto extends CommonPaginateDto {
>>>>>>> develop-softo-create-payout:src/payouts/presentation/dtos/requests/find-all-payments-period-paged.input.dto.ts
  @ApiProperty({
    example: 'teste-hnmkt',
  })
  @IsNotEmpty()
  @IsString()
  gTenantId: string;

  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  periodStartDate: Date;

  @ApiProperty({ example: new Date() })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
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
