import { ApiProperty } from '@nestjs/swagger';
import { Expose, Exclude, Type } from 'class-transformer';
import { BaseDto } from '../../../../shared/presentation/base.dto';
import { TenantStatusesConstant } from '~/tenants/domain/constants/tenant-statuses.constant';
import { TenantStatus } from '~/tenants/domain/entity/tenant-statuses.entity';
import { GetTenantCountryResponseDto } from '~/tenants/presentation/dto/output/tenant-country-response.dto';
import { GetTenantLanguageResponseDto } from '~/tenants/presentation/dto/output/tenant-language-response.dto';
import { GetTenantTimezoneResponseDto } from '~/tenants/presentation/dto/output/tenant-timezone-response.dto';
import { GetTenantAgencyResponseDto } from '~/tenants/presentation/dto/output/tenant-agency-response.dto';
export class GetTenantResponseDto extends BaseDto {
  @Expose()
  @ApiProperty({
    name: 'id',
    example: '0c599ab9-f634-49a8-b7cc-c9a5c13a8e44',
  })
  id: string;

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

  @Expose({ name: 'tenantId' })
  @ApiProperty({
    name: 'tenantId',
    example: 'description',
  })
  googleTenantId: string;

  @Expose()
  @ApiProperty({
    example: { test: 'test' },
  })
  settings: Record<string, any>;

  @Expose()
  @ApiProperty({ example: 'http://logo' })
  logo: string;

  @Expose()
  @ApiProperty({
    example: 'dontknow',
  })
  accountName: string;

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

  @Expose({ name: 'status' })
  @ApiProperty({
    example: 'Pending',
    type: 'enum',
    enum: TenantStatusesConstant,
  })
  getTenantStatus() {
    return this.tenantStatus?.name ?? 'Pending';
  }

  @Exclude()
  tenantStatus: TenantStatus;

  @ApiProperty({ example: '643303d0a19029aa893f0f9b' })
  @Expose()
  integrationCode: string;

  @ApiProperty({ name: 'country' })
  @Expose({ name: 'country' })
  @Type(() => GetTenantCountryResponseDto)
  countries: GetTenantCountryResponseDto;

  @ApiProperty({ name: 'language' })
  @Expose({ name: 'language' })
  @Type(() => GetTenantLanguageResponseDto)
  languages: GetTenantLanguageResponseDto;

  @ApiProperty({ name: 'timezone' })
  @Expose({ name: 'timezone' })
  @Type(() => GetTenantTimezoneResponseDto)
  timezone: GetTenantTimezoneResponseDto;

  @ApiProperty({ name: 'agency' })
  @Expose({ name: 'agency' })
  @Type(() => GetTenantAgencyResponseDto)
  agencies: GetTenantAgencyResponseDto;
}
