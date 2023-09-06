import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '~/shared/presentation/base.dto';
export class FindAllTenantBalancePagedOutput extends BaseDto {
  @ApiProperty({
    example: '74deb067-2bf6-45b1-991d-a0f22ab0ae3a',
  })
  id: string;

  @ApiProperty({
    example: 'Test',
  })
  name: string;

  @ApiProperty({
    example: 'test-hnmkt',
  })
  gTenantId: string;

  @ApiProperty({
    example: {
      id: '40768094-b6fb-4cba-9733-377202991137',
      name: 'Agency',
    },
  })
  agency: object;

  @ApiProperty({
    example: {
      recurringIntervalCount: 30,
      recurringInterval: {
        id: 'cd44a946-bfdd-4370-b2cc-1b3f0df311fd',
        name: 'Daily',
        interval: 'day',
      },
    },
  })
  terms: object;

  @ApiProperty({
    example: {
      id: 'a217e218-a723-4659-8f3d-9f218310655b',
      name: 'Active',
      slug: 'active',
    },
  })
  status: object;

  @ApiProperty({
    example: {
      id: '15d19c35-fc21-4eb3-b2dd-37511ee58e2b',
      status: {
        id: '6f1342e6-af0e-4642-8e56-cec2efb2303d',
        name: 'Paid',
        slug: 'paid',
      },
      amount: '59423.000000',
      settlementCurrency: {
        id: 'ef579caf-a6da-4d53-80cb-a67bf4742a3e',
        name: 'United States dollar',
        isoCode: 'USD',
        symbol: '$',
      },
      periodStartDate: '2023-01-01',
      periodEndDate: '2023-01-31',
      processedDate: '2023-07-14 10:13:48.860 -0300',
    },
  })
  lastPayout: object;

  @ApiProperty({
    example: 95000.55,
  })
  totalPaidAmount: number;

  @ApiProperty({
    example: [
      {
        id: '05d1c20c-d0d5-47ee-bed9-accb0dbeb2fb',
        amount: '95000.000000',
        updatedDate: new Date(),
        settlementCurrency: {
          id: 'ef579caf-a6da-4d53-80cb-a67bf4742a3e',
          name: 'United States dollar',
          isoCode: 'USD',
          symbol: '$',
        },
      },
    ],
  })
  balances: object;
}
