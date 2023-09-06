import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneTenantPayoutInputDto {
  @ApiProperty({
    example: 'USD',
    description: 'The currency ISO CODE for the tenant balance.',
  })
  @IsNotEmpty()
  @IsString()
  settlementCurrencyIsoCode: string;
}
