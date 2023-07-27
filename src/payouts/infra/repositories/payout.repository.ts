import { DataSource } from 'typeorm';
import { PayoutDomainEntity } from '~/payouts/domain/entities/payout.entity';
import { IPayoutRepository } from '~/payouts/domain/repositories';
import { TenantPayouts } from '~/shared/infra/database/entities';

export class PayoutRepositoryTypeOrmAdapter implements IPayoutRepository {
  constructor(private readonly dataSource: DataSource) {}

  async save(input: PayoutDomainEntity): Promise<void> {
    const repository =
      this.dataSource.getRepository<TenantPayouts>(TenantPayouts);

    const entity = repository.create({
      id: input.getState().id,
      createdDate: input.getState().createdDate,
      updatedDate: input.getState().updatedDate,
      deletedDate: input.getState().deletedDate,
      processedDate: input.getState().processedDate,
      expectedArrivalDate: input.getState().expectedArrivalDate,
      payoutAlternativeId: input.getState().payoutAlternativeId,
      periodStartDate: input.getState().periodStartDate,
      periodEndDate: input.getState().periodEndDate,
      amount: input.getState().amount,
      termsRecurringIntervalCount: input.getState().termsRecurringIntervalCount,
      termsRecurringIntervalId: input.getState().termsRecurringIntervalId,
      customerGrossAmount: input.getState().customerGrossAmount,
      customerFeeAmount: input.getState().customerFeeAmount,
      paymentGatewayNetAmount: input.getState().paymentGatewayNetAmount,
      statusId: input.getState().statusId,
      settlementCurrencyId: input.getState().settlementCurrencyId,
      processorUserId: input.getState().processorUserId,
      creatorUserId: input.getState().creatorUserId,
      updaterUserId: input.getState().updaterUserId,
      tenantId: input.getState().tenantId,
    });

    await repository.save(entity);
  }
}
