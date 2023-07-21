import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseTenantDto } from '~/shared/presentation/base-tenant.dto';

export class TenantCurrencyDto extends BaseTenantDto {
  @Expose()
  @ApiProperty({
    type: String,
    example: 'United States dollar',
  })
  name: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: '$',
  })
  symbol: string;

  @Expose()
  @ApiProperty({
    type: String,
    example: 'USD',
  })
  isoCode: string;

  // @Expose()
  // @ApiProperty({
  //   type: Boolean,
  //   example: true,
  // })
  // isDefault: boolean;

  // @Expose()
  // @ApiProperty({
  //   type: Boolean,
  //   example: true,
  // })
  // isActive: boolean;
}
