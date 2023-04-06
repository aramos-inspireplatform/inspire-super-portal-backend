import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';

export class TenantResponseDto extends BaseDto {
  @Expose()
  @ApiProperty({
    name: 'id',
    example: '62b365de06835f869cf631ed',
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

  @Expose()
  @ApiProperty({
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
}
