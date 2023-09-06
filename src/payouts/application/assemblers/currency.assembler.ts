import { CurrencyDomainEntity } from '~/payouts/domain/entities/currency.entity';

export class CurrencyAssembler {
  static assembly(input?: CurrencyAssembler.Input): CurrencyDomainEntity {
    if (!input) return new CurrencyDomainEntity();
    return new CurrencyDomainEntity({
      id: input.id,
      name: input.name,
      symbol: input.symbol,
      isoCode: input.isoCode,
      createdDate: input.createdDate,
      updatedDate: input.updatedDate,
      deletedDate: input.deletedDate,
    });
  }
}

export namespace CurrencyAssembler {
  export type Input = Partial<{
    id: string;
    name: string;
    symbol: string;
    isoCode: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  }>;
}
