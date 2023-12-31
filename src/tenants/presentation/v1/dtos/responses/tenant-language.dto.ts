import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseTenantDto } from '~/shared/presentation/base-tenant.dto';

export class TenantLanguageDto extends BaseTenantDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: 'English - United States',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'en-US',
  })
  isoCode: string;
}
