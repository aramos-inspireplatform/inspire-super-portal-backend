import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsDate,
  IsOptional,
} from 'class-validator';

export class SearchAllPayoutPaymentsInputDto {
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
