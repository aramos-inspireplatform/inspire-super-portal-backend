import { ICreatePayoutBexsDao } from '~/payouts/application/daos/create-payout-bexs.dao.contract';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';

export class CreatePayoutBexsDao implements ICreatePayoutBexsDao {
  constructor(
    private readonly inspirePaymentApiService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: ICreatePayoutBexsDao.Input,
  ): Promise<ICreatePayoutBexsDao.Output> {
    const file = await this.inspirePaymentApiService.createPayoutBexs({
      ...attrs,
    });

    return file;
  }
}
