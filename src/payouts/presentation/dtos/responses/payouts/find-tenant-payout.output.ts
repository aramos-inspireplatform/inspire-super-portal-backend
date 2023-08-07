import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class FindTenantPayoutOutput extends BaseDto {
  @Expose()
  @ApiProperty({
    example: '15d19c35-fc21-4eb3-b2dd-37511ee58e2b',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: '12345678',
  })
  alternativeId: string;

  @Expose()
  @ApiProperty({
    example: {
      id: 'd0cd6825-21a9-48ae-9385-974436b98f54',
      name: 'Test',
      gTenantId: 'test-hnmkt',
      agency: {
        id: '55dc485d-2f25-4bfd-8930-d8a5757bbb75',
        name: 'Agency',
      },
    },
  })
  tenant: object;

  @Expose()
  @ApiProperty({
    example: {
      id: '89b13e8c-8cea-4d8d-b3f2-6e460d640795',
      name: 'User Test',
      firstName: 'User',
      lastName: 'Test',
    },
  })
  processorUser: object;

  @Expose()
  @ApiProperty({
    example: {
      id: '6f1342e6-af0e-4642-8e56-cec2efb2303d',
      name: 'Paid',
      slug: 'paid',
    },
  })
  status: object;

  @Expose()
  @ApiProperty({
    example: 59423.53,
  })
  amount: number;

  @Expose()
  @ApiProperty({
    example: {
      id: 'ef579caf-a6da-4d53-80cb-a67bf4742a3e',
      name: 'United States dollar',
      isoCode: 'USD',
      symbol: '$',
    },
  })
  settlementCurrency: object;

  @Expose()
  @ApiProperty({ example: new Date() })
  createdDate: Date;

  @Expose()
  @ApiProperty({ example: new Date() })
  processedDate: Date;

  @Expose()
  @ApiProperty({ example: new Date() })
  paidDate: Date;

  @Expose()
  @ApiProperty({ example: new Date() })
  expectedArrivalDate: Date;

  @Expose()
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
}
