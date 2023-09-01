import { DataSource } from 'typeorm';
import { PaymentProcessorDomainEntity } from '~/requests/domain/entities/payment-processor.entity';
import { PaymentProcessorAssembler } from '~/requests/domain/repositories/assemblers';
import { IPaymentProcessorRepository } from '~/requests/domain/repositories/payment-processor-repository.contract';
import { Processors } from '~/shared/infra/database/entities';

export class PaymentProcessorRepositoryTypeOrmAdapter
  implements IPaymentProcessorRepository
{
  constructor(private readonly connection: DataSource) {
    //
  }

  async findByIntegrationCode(
    integrationCode: string,
  ): Promise<PaymentProcessorDomainEntity> {
    const repository = this.connection.getRepository(Processors);
    const paymentProcessor = await repository.findOne({
      where: { integrationCode },
    });
    return PaymentProcessorAssembler.assembly(paymentProcessor);
  }
}
