import { ApiProperty } from '@nestjs/swagger';
import { BaseTenantDto } from '~/shared/presentation/base-tenant.dto';

export class CreateTenantOutput extends BaseTenantDto {
  @ApiProperty({
    example: 'dontknow',
  })
  name: string;

  @ApiProperty({
    example: 'description',
  })
  slug: string;

  @ApiProperty({
    example: 'teste-hmnkt',
  })
  gTenantId: string;

  @ApiProperty({
    example: 'dontknow',
  })
  accountName: string;

  @ApiProperty({ example: 'http://logo' })
  logo: string;

  @ApiProperty({ example: 'Sample public business name' })
  publicBusinessName: string;

  @ApiProperty({ example: 'Dual pricing discount' })
  dualPricingDiscountAmount: number;

  @ApiProperty({ example: 'Dual pricing active' })
  isDualPricingActive: boolean;
}
