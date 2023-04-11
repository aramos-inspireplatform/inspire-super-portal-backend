import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class GetPaymentCountryResponseDto extends BaseDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: 'Brazil',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'Brasil',
  })
  nativeName: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'BR',
  })
  code: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'https://test',
  })
  flagSvgUrl: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '86fd5615-544d-4aa7-88d1-f8bdd3da8156',
  })
  wrapperIntegrationId: string;
}
