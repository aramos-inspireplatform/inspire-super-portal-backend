import { ApiProperty } from '@nestjs/swagger';
import { SearchAllPayoutPaymentOutput } from '~/payouts/presentation/dtos/responses/search-all-payout-payment.output';
export class SearchAllPayoutPaymentArrayOutput {
  @ApiProperty({
    type: SearchAllPayoutPaymentOutput,
    isArray: true,
  })
  rows: SearchAllPayoutPaymentOutput[];
}
