import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseTenantDto } from '~/shared/presentation/base-tenant.dto';

export class TenantStatusDto extends BaseTenantDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: 'Active',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'active',
  })
  slug: string;
}
