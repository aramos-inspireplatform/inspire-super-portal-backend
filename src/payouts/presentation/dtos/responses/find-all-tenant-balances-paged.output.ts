import { ApiProperty } from '@nestjs/swagger';
import { FindAllTenantBalancePagedOutput } from '~/payouts/presentation/dtos/responses/find-all-tenant-balance-paged.output';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';

export class FindAllTenantBalancesPagedOutputDto extends PaginatedResultsDto<FindAllTenantBalancePagedOutput> {
  @ApiProperty({
    type: FindAllTenantBalancePagedOutput,
    isArray: true,
  })
  rows: FindAllTenantBalancePagedOutput[];
}
