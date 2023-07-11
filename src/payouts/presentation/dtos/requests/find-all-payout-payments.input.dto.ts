import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  IsDate,
  IsOptional,
} from 'class-validator';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';

export class FindAllPayoutPaymentsInputDto extends CommonPaginateDto {
  @ApiProperty({
    example: 'e6c846a8-fc6c-43ee-9239-345c6033e22a',
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
    example: 'ef579caf-a6da-4d53-80cb-a67bf4742a3e',
  })
  @IsNotEmpty()
  @IsUUID()
  settlementCurrencyId: string;

  @ApiProperty({
    example: '7fcd36e4-3fec-4033-8a07-d95cd193fc7a',
    required: false,
  })
  @IsOptional()
  @IsUUID()
  payoutId?: string;
}
