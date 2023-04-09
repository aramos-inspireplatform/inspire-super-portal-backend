import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PaymentMethod } from '~/payment-methods/domain/entity/payment-method.entity';
import { IPaymentMethodsRepository } from '~/payment-methods/infra/contracts/repository/payment-methods-repository.contract';
import { PaymentMethods } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

@Injectable()
export class PaymentMethodsRepository implements IPaymentMethodsRepository {
  repository: Repository<PaymentMethods>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository =
      this.dataSource.getRepository<PaymentMethods>(PaymentMethods);
  }

  async findAll(): IPaymentMethodsRepository.FindAllResult {
    // TODO: verificar se vamos precisar desse filtro: { where: { isActive: true } }
    const [paymentMethods, count] = await this.repository.findAndCount();
    return [paymentMethods.map((pm) => new PaymentMethod(pm)), count];
  }
}
