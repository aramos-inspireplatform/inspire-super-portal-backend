import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { ICreatePayoutBexsDao } from '~/payouts/application/daos/create-payout-bexs.dao.contract';
import { CreatePayoutBexsQuery } from '~/payouts/application/queries/create-payout-bexs.query';

export class CreatePayoutBexsQueryFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.CREATE_PAYOUT_BEXS_QUERY,
      useFactory: (createPayoutBexsDao: ICreatePayoutBexsDao) =>
        new CreatePayoutBexsQuery(createPayoutBexsDao),
      inject: [PayoutProvidersSymbols.CREATE_PAYOUT_BEXS_DAO],
    };
  }
}
