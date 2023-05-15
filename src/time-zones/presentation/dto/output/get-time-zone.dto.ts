import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class GetTimezoneDto extends BaseDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: 'America/Sao_Paulo',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'BR',
  })
  countryIsoCode: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '-03:00:00',
  })
  utcOffset: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '-03:00:00',
  })
  utcDstOffset: string;

  @Expose()
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isDefault: boolean;
}
