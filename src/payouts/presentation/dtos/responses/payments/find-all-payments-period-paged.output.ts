import { ApiProperty } from '@nestjs/swagger';
import { FindAllPaymentsPeriodPagedPaymentOutput } from '~/payouts/presentation/dtos/responses/payments';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';

export class FindAllPaymentsPeriodPagedOutputDto extends PaginatedResultsDto<FindAllPaymentsPeriodPagedPaymentOutput> {
  @ApiProperty({
    type: FindAllPaymentsPeriodPagedPaymentOutput,
    isArray: true,
  })
  rows: FindAllPaymentsPeriodPagedPaymentOutput[];
}
