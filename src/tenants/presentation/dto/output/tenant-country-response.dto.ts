import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseTenantDto } from '~/shared/presentation/base-tenant.dto';

export class GetTenantCountryResponseDto extends BaseTenantDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: 'United States',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'United States',
  })
  nativeName: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'US',
  })
  code: string;

  @Expose()
  @ApiProperty({
    type: String,
    example:
      'https://inspire-tenant-assets-public.s3.amazonaws.com/countries_flags/US.svg',
  })
  flagSvgUrl: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '+1',
  })
  dialCode: string;
}
