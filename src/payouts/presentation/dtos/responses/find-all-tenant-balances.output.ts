import { ApiProperty } from '@nestjs/swagger';
import { FindAllTenantBalanceOutput } from '~/payouts/presentation/dtos/responses/find-all-tenant-balance.output';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';

export class FindAllTenantBalancesOutputDto extends PaginatedResultsDto<FindAllTenantBalanceOutput> {
  @ApiProperty({
    type: FindAllTenantBalanceOutput,
    isArray: true,
  })
  rows: FindAllTenantBalanceOutput[];
}
