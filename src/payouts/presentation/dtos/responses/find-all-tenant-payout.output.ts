import { ApiProperty } from '@nestjs/swagger';
import { FindTenantPayoutOutput } from '~/payouts/presentation/dtos/responses/find-tenant-payout.output';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';

export class FindAllTenantPayoutsOutputDto extends PaginatedResultsDto<FindTenantPayoutOutput> {
  @ApiProperty({
    type: FindTenantPayoutOutput,
    isArray: true,
  })
  rows: FindTenantPayoutOutput[];
}
