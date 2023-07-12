import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FindOneTenantBalanceInputDto {
  @ApiProperty({
    example: 'USD',
  })
  @IsNotEmpty()
  @IsString()
  settlementCurrencyIsoCode: string;
}
