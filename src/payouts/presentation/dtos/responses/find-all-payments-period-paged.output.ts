import { ApiProperty } from '@nestjs/swagger';
import { FindAllPaymentsPeriodPagedPaymentOutput } from '~/payouts/presentation/dtos/responses/find-all-payments-period-paged-payment.output';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';

export class FindAllPaymentsPeriodPagedOutputDto extends PaginatedResultsDto<FindAllPaymentsPeriodPagedPaymentOutput> {
  @ApiProperty({
    type: FindAllPaymentsPeriodPagedPaymentOutput,
    isArray: true,
  })
  rows: FindAllPaymentsPeriodPagedPaymentOutput[];
}
