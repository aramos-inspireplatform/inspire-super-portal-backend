import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class SynchronizeTenantBalanceInputDto {
  @ApiProperty({
    example: '6ce3fc77-ef0a-4ab2-af10-f7463dac27dd',
    description: 'The unique identifier.',
  })
  @IsNotEmpty()
  @IsUUID()
  settlementCurrencyId: string;

  @ApiProperty({
    example: 1000.55,
    description: 'The tenant balance.',
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
