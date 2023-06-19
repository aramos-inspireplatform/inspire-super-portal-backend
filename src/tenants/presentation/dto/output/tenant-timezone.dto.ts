import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseTenantDto } from '~/shared/presentation/base-tenant.dto';

export class TenantTimezoneDto extends BaseTenantDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: 'America/Chicago',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'US',
  })
  countryIsoCode: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '-06:00:00',
  })
  utcOffset: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '-05:00:00',
  })
  utcDstOffset: string;
}
