import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';

export interface IFindOneTenantPayoutDao {
  execute(
    params: IFindOneTenantPayoutDao.Input,
  ): IFindOneTenantPayoutDao.Output;
}

export namespace IFindOneTenantPayoutDao {
  export type Input = {
    authUser: UserAuthDto;
    payoutId: string;
  };

  export type Output = Promise<Payout>;

  // Additional types
  type Payout = {
    id: string;
    statusPayout: string;
    tenant: Tenant;
    createdDate: Date;
    payoutTermsCount: number;
    payoutTermsInterval: string;
    periodStartDate: Date;
    periodEndDate: Date;
    amount: number;
  };

  type Tenant = {
    gTenantId: string;
    name: string;
  };
}
