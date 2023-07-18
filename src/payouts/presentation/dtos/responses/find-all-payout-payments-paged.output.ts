import { ApiProperty } from '@nestjs/swagger';
import { FindAllPayoutPaymentsPagedPaymentOutput } from '~/payouts/presentation/dtos/responses/find-all-payout-payments-paged-payment.output';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';

export class FindAllPayoutPaymentsPagedOutputDto extends PaginatedResultsDto<FindAllPayoutPaymentsPagedPaymentOutput> {
  @ApiProperty({
    type: FindAllPayoutPaymentsPagedPaymentOutput,
    isArray: true,
  })
  rows: FindAllPayoutPaymentsPagedPaymentOutput[];
}
