import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';
import { FindTenantOutput } from '~/tenants/presentation/dto/output/find-tenant.output';

export class FindAllTenantsOutput extends PaginatedResultsDto<FindTenantOutput> {
  @ApiProperty({
    type: FindTenantOutput,
    isArray: true,
  })
  rows: FindTenantOutput[];
}
