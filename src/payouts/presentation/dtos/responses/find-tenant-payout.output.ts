import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { PayoutStatusesDto } from '~/payout-statuses/presentation/dtos/responses/payout-statuses.dto';
import { FindTermsRecurringIntervalsOutput } from '~/payouts/presentation/dtos/responses/find-terms-recurring-intervals.output';
import { GetSettlementCurrenciesResponseDto } from '~/settlement-currencies/presentation/dto/output/get-settlement-currencies.dto';
import { BaseDto } from '~/shared/presentation/base.dto';
import { TenantDto } from '~/tenants/presentation/dtos/responses/tenant.dto';
import { UserResponseDto } from '~/users/presentation/dtos/responses/user-response.dto';

export class UserDto extends BaseDto {
  @Expose()
  @ApiProperty({
    example: 'Jonas',
  })
  firstName: string;

  @Expose()
  @ApiProperty({
    example: 'Klocko',
  })
  lastName: string;

  @Expose()
  @ApiProperty({
    example: 'Allene.Jast6@gmail.com',
  })
  email: string;
}

export class settlementCurrenciesDto extends BaseDto {
  @Expose()
  @ApiProperty({
    example: 'Brazilian Real',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: 'R$',
  })
  symbol: string;

  @Expose()
  @ApiProperty({
    example: 'BRL',
  })
  isoCode: string;
}

export class TenantIdDto extends BaseDto {
  @Expose()
  @ApiProperty({
    example: 'Jasmin',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: 'c9183d22-229f-41a0-94dc-21586d3e37f3',
  })
  googleTenantId: string;

  @Expose()
  @ApiProperty({
    example: 'c9183d22-229f-41a0-94dc-21586d3e37h2',
  })
  agencyId: string;

  @Expose()
  @ApiProperty({
    example: 'Jasmin L',
  })
  agencyName: string;

  @Expose()
  @ApiProperty({
    example: 30,
  })
  termsRecurringIntervalCount: number;

  @Expose()
  @ApiProperty({
    example: 1820,
  })
  totalPaidAmount: number;
}

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
  @Type(() => UserDto)
  creatorUsers: UserDto;

  @ApiProperty()
  @Expose()
  @Type(() => UserDto)
  deleterUsers: UserDto;

  @ApiProperty()
  @Expose()
  @Type(() => PayoutStatusesDto)
  payoutStatuses: PayoutStatusesDto;

  @ApiProperty()
  @Expose()
  @Type(() => UserDto)
  processorUsers: UserDto;

  @ApiProperty()
  @Expose()
  @Type(() => settlementCurrenciesDto)
  settlementCurrencies: settlementCurrenciesDto;

  @ApiProperty()
  @Expose()
  @Type(() => TenantIdDto)
  tenantsId: TenantIdDto;

  @ApiProperty()
  @Expose()
  @Type(() => FindTermsRecurringIntervalsOutput)
  termsRecurringIntervals: FindTermsRecurringIntervalsOutput;

  @ApiProperty()
  @Expose()
  @Type(() => UserDto)
  updaterUsers: UserDto;

  @Expose()
  @ApiProperty({
    type: TenantIdDto,
    isArray: true,
  })
  tenants: TenantIdDto[];
}
