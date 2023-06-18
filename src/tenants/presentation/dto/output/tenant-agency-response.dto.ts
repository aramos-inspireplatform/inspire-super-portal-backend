import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseTenantDto } from '~/shared/presentation/base-tenant.dto';

export class TenantAgencyResponseDto extends BaseTenantDto {
  @Expose()
  @ApiProperty({ example: 'Agency name' })
  name: string;

  @Expose()
  @ApiProperty({
    example:
      'https://inspire-tenant-assets-public.s3.amazonaws.com/logo/agencies/aW6uKbwkK93touYjhy2T3g9A/uNWrsDsXwWVuh8pAfWtKRVeA.jpg',
  })
  logo: string;
}
