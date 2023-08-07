import { ApiProperty } from '@nestjs/swagger';
import { FindAllTenantBalancePagedOutput } from '~/payouts/presentation/dtos/responses/tenant-balances';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';

export class FindAllTenantBalancesPagedOutputDto extends PaginatedResultsDto<FindAllTenantBalancePagedOutput> {
  @ApiProperty({
    type: FindAllTenantBalancePagedOutput,
    isArray: true,
  })
  rows: FindAllTenantBalancePagedOutput[];
}
