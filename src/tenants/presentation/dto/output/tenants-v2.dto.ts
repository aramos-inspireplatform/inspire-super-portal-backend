import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';
import { TenantV2Dto } from '~/tenants/presentation/dto/output/tenant-v2.dto';

export class TenantsV2Dto extends PaginatedResultsDto<TenantV2Dto> {
  @ApiProperty({
    type: TenantV2Dto,
    isArray: true,
  })
  rows: TenantV2Dto[];
}
