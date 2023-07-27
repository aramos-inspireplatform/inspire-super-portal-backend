import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';

export class CurrencyDomainEntity extends BaseDomainEntity {
  private name: string;
  private symbol: string;
  private isoCode: string;

  constructor(input?: Partial<CurrencyDomainEntity.Input>) {
    super(input);
    Object.assign(this, input);
  }

  getState() {
    return {
      id: this.id,
      name: this.name,
      symbol: this.symbol,
      isoCode: this.isoCode,
      createdDate: this.createdDate,
      updatedDate: this.updatedDate,
      deletedDate: this.deletedDate,
    };
  }
}

export namespace CurrencyDomainEntity {
  export type Input = {
    id: string;
    name: string;
    symbol: string;
    isoCode: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  };

  export type State = Input & {
    //adittional methods here
  };

  export type Create = Pick<
    CurrencyDomainEntity.Input,
    'id' | 'name' | 'symbol' | 'isoCode'
  > & {
    //
  };
}
