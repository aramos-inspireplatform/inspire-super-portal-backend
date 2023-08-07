import { ApiProperty } from '@nestjs/swagger';
import { FindTenantPayoutOutput } from '~/payouts/presentation/dtos/responses/payouts/find-tenant-payout.output';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';

export class FindAllTenantPayoutsPagedOutputDto extends PaginatedResultsDto<FindTenantPayoutOutput> {
  @ApiProperty({
    type: FindTenantPayoutOutput,
    isArray: true,
  })
  rows: FindTenantPayoutOutput[];
}
