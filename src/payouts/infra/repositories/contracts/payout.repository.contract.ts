import { PayoutDomainEntity } from '~/payouts/domain/entities/payout.entity';

export interface IPayoutRepository {
  save(input: PayoutDomainEntity): Promise<void>;
}

export namespace IPayoutRepository {
  //
}
