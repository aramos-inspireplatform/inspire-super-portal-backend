export class PaymentProcessorDomainEntity {
  private id: string;
  private name: string;
  private isActive: boolean;
  private isPayoutAvailable: boolean;

  constructor(input?: Partial<PaymentProcessorDomainEntity.Input>) {
    Object.assign(this, input);
  }

  getState(): PaymentProcessorDomainEntity.State {
    return {
      id: this.id,
      name: this.name,
      isActive: this.isActive,
      isPayoutAvailable: this.isPayoutAvailable,
    };
  }
}

export namespace PaymentProcessorDomainEntity {
  export type Input = {
    id: string;
    name: string;
    isActive: boolean;
    isPayoutAvailable: boolean;
  };

  export type State = Input & {
    // put here additional keys
  };
}
