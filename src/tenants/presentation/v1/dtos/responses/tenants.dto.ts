import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { BaseDto } from '~/shared/presentation/base.dto';
import { TenantStatus } from '~/tenants/domain/entities/tenant-statuses.entity';
import { TenantStatusesConstant } from '~/tenants/domain/constants/tenant-statuses.constant';
export class TenantsDto extends BaseDto {
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

  @Expose({ name: 'status' })
  @ApiProperty({
    example: TenantStatusesConstant.Pending,
    type: 'enum',
    enum: TenantStatusesConstant,
  })
  getTenantStatus() {
    return this.tenantStatus?.name ?? TenantStatusesConstant.Pending;
  }

  @Exclude()
  tenantStatus: TenantStatus;

  @ApiProperty({ example: '643303d0a19029aa893f0f9b' })
  @Expose()
  integrationCode: string;

  @ApiProperty({ example: '2021-01-01T00:00:00.000Z' })
  @Expose()
  createdDate: Date;
}
