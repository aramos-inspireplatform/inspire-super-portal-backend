import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class GetSettlementCurrenciesResponseDto extends BaseDto {
  @Expose()
  @ApiProperty({ type: String, example: 'Brazilian Real' })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'bb2d5ae7-e161-4f24-a0fc-435b1f5f6ac2',
  })
  wrapperIntegrationId: string;
}
