import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';
import { BaseDto } from '~/shared/presentation/base.dto';
export class FindOneTenantPayoutOutput extends BaseDto {
  @Expose()
  @ApiProperty({
    example: '74deb067-2bf6-45b1-991d-a0f22ab0ae3a',
  })
  @IsUUID()
  id: string;

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
    example: 59423.55,
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
  periodStartDate: Date;

  @Expose()
  @ApiProperty({ example: new Date() })
  periodEndDate: Date;

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
  @ApiProperty({ example: new Date().toISOString().split('T')[0] })
  expectedArrivalDate: Date;

  @Expose()
  @ApiProperty({
    example: {
      id: 'd0cd6825-21a9-48ae-9385-974436b98f54',
      gTenantId: 'test-hnmkt',
      name: 'Test',
    },
  })
  tenant: object;

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
