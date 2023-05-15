import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class GetTenantToTenantCurrencyDto {
  @Expose()
  @ApiProperty({
    example: '6c9e4e70-3024-44b4-b66f-48e3df456852',
  })
  id: string;

  @Expose()
  @ApiProperty({
    example: 'Brazilian real',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: 'brl_currency',
  })
  slug: string;

  @Expose()
  @ApiProperty({
    example: 'teste-4x34g',
  })
  googleTenantId: string;

  @Expose()
  @ApiProperty({
    example: { test: 'test' },
  })
  settings: Record<string, any>;
}

export class GetAgencyDto extends BaseDto {
  @Expose()
  @ApiProperty({ example: 'Agency name' })
  name: string;

  @Expose()
  @ApiProperty({ example: 'http://logo' })
  logo: string;

  @Expose({ name: 'defaultTenantId' })
  @ApiProperty({ name: 'defaultTenantId' })
  @Type(() => GetTenantToTenantCurrencyDto)
  tenantId: GetTenantToTenantCurrencyDto;
}
