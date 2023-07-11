import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { TenantCountryDto } from '~/tenants/presentation/dtos/responses/tenant-country.dto';
import { TenantLanguageDto } from '~/tenants/presentation/dtos/responses/tenant-language.dto';
import { TenantTimezoneDto } from '~/tenants/presentation/dtos/responses/tenant-timezone.dto';
import { TenantAgencyDto } from '~/tenants/presentation/dtos/responses/tenant-agency.dto';
import { TenantCurrencyDto } from '~/tenants/presentation/dtos/responses/tenant-currency.dto';
import { IsArray } from 'class-validator';
import { TenantStatusDto } from '~/tenants/presentation/dtos/responses/tenant-status.dto';
import { BaseTenantDto } from '~/shared/presentation/base-tenant.dto';
export class FindPayoutPaymentOutput extends BaseTenantDto {
  @Expose()
  @ApiProperty({
    example: 'dontknow',
  })
  name: string;

  @Expose()
  @ApiProperty({
    example: 'description',
  })
  slug: string;

  @Expose()
  @ApiProperty({
    example: 'description',
  })
  googleTenantId: string;

  @Expose()
  @ApiProperty({
    example: 'dontknow',
  })
  accountName: string;

  @Expose()
  @ApiProperty({
    example: { test: 'test' },
  })
  settings: Record<string, any>;

  @Expose()
  @ApiProperty({ example: 'http://logo' })
  logo: string;

  @ApiProperty({ example: 'Sample public business name' })
  @Expose()
  publicBusinessName: string;

  @ApiProperty({ example: 'sample@email.com' })
  @Expose()
  supportEmail: string;

  @ApiProperty({ example: '123451234' })
  @Expose()
  supportPhoneNumber: string;

  @ApiProperty({ example: true })
  @Expose()
  showPhoneOnInvoiceAndReceipt?: boolean;

  // @ApiProperty({
  //   example: GetSupportAddressDto,
  // })
  // @Expose()
  // supportAddress?: GetSupportAddressDto;

  @ApiProperty({ example: 'Sample statement descriptor' })
  @Expose()
  statementDescriptor: string;

  @ApiProperty({ example: 'Sample shortened descriptor' })
  @Expose()
  shortenedDescriptor: string;

  @ApiProperty({ example: 'https://website.com' })
  @Expose()
  businessWebsite: string;

  @ApiProperty({ example: 'https://website.com/support' })
  @Expose()
  supportWebsite: string;

  @ApiProperty({ example: 'https://website.com/privacy-police' })
  @Expose()
  privacyPolicy: string;

  @ApiProperty({ example: 'https://website.com/terms-of-service' })
  @Expose()
  termsOfService: string;

  @ApiProperty({ example: new Date() })
  @Expose()
  createdAt: string;

  @ApiProperty()
  @Expose()
  @Type(() => TenantTimezoneDto)
  timezone: TenantTimezoneDto;

  @ApiProperty()
  @Expose()
  @Type(() => TenantLanguageDto)
  language: TenantLanguageDto;

  @ApiProperty()
  @Expose()
  @Type(() => TenantCurrencyDto)
  currency: TenantCurrencyDto;

  @ApiProperty({
    type: TenantCurrencyDto,
    isArray: true,
  })
  @Expose()
  @IsArray()
  @Type(() => TenantCurrencyDto)
  currencies: TenantCurrencyDto[];

  @ApiProperty()
  @Expose()
  @Type(() => TenantAgencyDto)
  agency: TenantAgencyDto;

  @ApiProperty()
  @Expose()
  @Type(() => TenantCountryDto)
  country: TenantCountryDto;

  @ApiProperty()
  @Expose()
  @Type(() => TenantStatusDto)
  status: TenantStatusDto;
}
