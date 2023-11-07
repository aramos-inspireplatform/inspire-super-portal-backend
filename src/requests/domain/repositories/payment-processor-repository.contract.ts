import { PaymentProcessorDomainEntity } from '~/requests/domain/entities/payment-processor.entity';

export interface IPaymentProcessorRepository {
  findByIntegrationCode(id: string): Promise<PaymentProcessorDomainEntity>;
}

export namespace IPaymentProcessorRepository {}
