import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class GetPaymentProcessorResponseDto extends BaseDto {
  @Expose()
  @ApiProperty({
    example: 'Payment Processor Name',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: true,
  })
  isActive: string;

  @Expose()
  @ApiProperty({
    example: 'cdc9b219-fb2a-4416-a092-81a02b312668',
  })
  integrationCode: string;
}
