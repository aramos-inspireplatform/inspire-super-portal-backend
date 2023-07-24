export namespace ReconcilePeriodDto {
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    status: string;
  };

  export type Result = Promise<Reconcile[]>;

  export type Reconcile = {
    id: string;
    periodStartDate: Date;
    periodEndDate: Date;
    filename: string | null;
    filenameExtension: string | null;
    processMessage: string | null;
    paymentGateway: PaymentGateway;
    status: ReconciliationStatus;
    creatorUser: User;
    transactions: Transaction[] | [];
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  };

  type PaymentGateway = {
    id: string;
    name: string;
    token: string;
    isActive: boolean;
    isDefault: boolean;
    account: string | null;
    wrapperIntegrationCode: string;
    settlementCurrency: SettlementCurrency;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  };

  type SettlementCurrency = {
    id: string;
    name: string;
    isoCode: string;
    symbol: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  };

  type ReconciliationStatus = {
    id: string;
    name: string;
    slug: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  };

  type User = {
    id: string;
    name: string;
    email: string;
    createdDate: Date;
    updatedDate: Date;
    deletedDate: Date;
  };

  type Transaction = {
    transactionTypeId: string;
    transactionStatusId: string;
    availableDate: Date;
    paidDate: Date;
    paymentDate: Date;
    installments: number;
    customerPaymentMethodId: string;
    customerCurrencyId: string;
    customerNetAmount: number;
    customerFeeAmount: number;
    customerGrossAmount: number;
    paymentGatewayId: string;
    paymentGatewayToken: string;
    paymentProcessorToken: string;
    paymentGatewayCurrencyId: string;
    paymentGatewayNetAmount: number;
    paymentGatewayFeeAmount: number;
    paymentGatewayGrossAmount: number;
    paymentGatewayExchangeRate: number;
    refundAmount: number;
    receiptNumber: string;
    payoutId: string;
    reconciledDate: Date;
    reconciledConfirmationNumber: string;
    manualReconciledUserId: string;
  };
}
