import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { PayoutStatusesDto } from '~/payout-statuses/presentation/dtos/responses/payout-statuses.dto';
import { FindTermsRecurringIntervalsOutput } from '~/payouts/presentation/dtos/responses/find-terms-recurring-intervals.output';
import { GetSettlementCurrenciesResponseDto } from '~/settlement-currencies/presentation/dto/output/get-settlement-currencies.dto';
import { BaseDto } from '~/shared/presentation/base.dto';
import { TenantDto } from '~/tenants/presentation/dtos/responses/tenant.dto';
import { UserResponseDto } from '~/users/presentation/dtos/responses/user-response.dto';
export class FindTenantPayoutOutput extends BaseDto {
  @Expose()
  @ApiProperty({
    example: '1',
  })
  payoutAlternativeId: string;

  @Expose()
  @ApiProperty({ example: new Date() })
  periodStartDate: Date;

  @Expose()
  @ApiProperty({ example: new Date() })
  periodEndDate: Date;

  @Expose()
  @ApiProperty({
    example: 300,
  })
  amount: number;

  @Expose()
  @ApiProperty({
    example: 30,
  })
  termsRecurringIntervalCount: number;

  @Expose()
  @ApiProperty({
    example: 300,
  })
  customerGrossAmount: number;

  @Expose()
  @ApiProperty({
    example: 300,
  })
  customerFeeAmount: number;

  @Expose()
  @ApiProperty({
    example: 300,
  })
  paymentGatewayNetAmount: number;

  @Expose()
  @ApiProperty({ example: new Date() })
  expectedArrivalDate: Date;

  @Expose()
  @ApiProperty({ example: new Date() })
  processedDate: Date;

  @ApiProperty()
  @Expose()
  @Type(() => UserResponseDto)
  creatorUsers: UserResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => UserResponseDto)
  deleterUsers: UserResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => PayoutStatusesDto)
  payoutStatuses: PayoutStatusesDto;

  @ApiProperty()
  @Expose()
  @Type(() => UserResponseDto)
  processorUsers: UserResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => GetSettlementCurrenciesResponseDto)
  settlementCurrencies: GetSettlementCurrenciesResponseDto;

  @ApiProperty()
  @Expose()
  @Type(() => TenantDto)
  tenantsId: TenantDto;

  @ApiProperty()
  @Expose()
  @Type(() => FindTermsRecurringIntervalsOutput)
  termsRecurringIntervals: FindTermsRecurringIntervalsOutput;

  @ApiProperty()
  @Expose()
  @Type(() => UserResponseDto)
  updaterUsers: UserResponseDto;

  @Expose()
  @ApiProperty({
    type: TenantDto,
    isArray: true,
  })
  tenants: TenantDto[];
}
