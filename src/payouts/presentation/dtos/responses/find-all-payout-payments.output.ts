import { ApiProperty } from '@nestjs/swagger';
import { FindPayoutPaymentOutput } from '~/payouts/presentation/dtos/responses/find-payments-payout.output';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';

export class FindAllPayoutPaymentsOutputDto extends PaginatedResultsDto<FindPayoutPaymentOutput> {
  @ApiProperty({
    type: FindPayoutPaymentOutput,
    isArray: true,
  })
  rows: FindPayoutPaymentOutput[];
}
