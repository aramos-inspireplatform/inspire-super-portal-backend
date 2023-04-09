import { PaymentMethod } from '~/payment-methods/domain/entity/payment-method.entity';

export interface IPaymentMethodsRepository {
  findAll(): IPaymentMethodsRepository.FindAllResult;
}

export namespace IPaymentMethodsRepository {
  export type FindAllResult = Promise<[Array<PaymentMethod>, number]>;
}
