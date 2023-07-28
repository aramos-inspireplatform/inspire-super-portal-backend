import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
// import { Type } from 'class-transformer';

export class FindOnePayoutSummaryPreviewPaymentInputDto {
  @ApiProperty({
    example: '1c2bd253-736e-4bc3-a935-a0ef76c8e13f',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
