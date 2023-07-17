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
    example: 'Processed',
  })
  statusPayout: Date;

  @Expose()
  @ApiProperty({ example: new Date() })
  createdDate: Date;

  @Expose()
  @ApiProperty({
    example: {
      gTenantId: 'Test',
      name: 'Test',
    },
  })
  tenant: object;

  @Expose()
  @ApiProperty({
    example: 30,
  })
  payoutTermsCount: number;

  @Expose()
  @ApiProperty({
    example: 'Days',
  })
  payoutTermsInterval: string;

  @Expose()
  @ApiProperty({ example: new Date() })
  periodStartDate: Date;

  @Expose()
  @ApiProperty({ example: new Date() })
  periodEndDate: Date;

  @Expose()
  @ApiProperty({
    example: 30,
  })
  amount: number;
}
