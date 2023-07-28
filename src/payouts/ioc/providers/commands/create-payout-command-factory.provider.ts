import { FactoryProvider } from '@nestjs/common';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { CreatePayoutCommand } from '~/payouts/application/commands';
import { InspireApiServicesProvidersSymbols } from '~/shared/application/services/inspire-api-services/shared/symbols/inspire-api-services-providers.symbols';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import {
  ITenantRepository,
  IPayoutRepository,
} from '~/payouts/domain/repositories';

export class CreatePayoutCommandFactoryProvider {
  static register(): FactoryProvider {
    return {
      provide: PayoutProvidersSymbols.Commands.CREATE_PAYOUT,
      useFactory: (
        apiPaymentService: IInspirePaymentApiService,
        tenantRepository: ITenantRepository,
        payoutRepository: IPayoutRepository,
      ) =>
        new CreatePayoutCommand(
          apiPaymentService,
          tenantRepository,
          payoutRepository,
        ),
      inject: [
        InspireApiServicesProvidersSymbols.INSPIRE_PAYMENT_API_SERVICE,
        PayoutProvidersSymbols.Repositories.TENANT,
        PayoutProvidersSymbols.Repositories.PAYOUT,
      ],
    };
  }
}
