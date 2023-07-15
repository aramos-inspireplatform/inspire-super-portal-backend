export namespace FindAllPaymentsPeriodPagedDto {
  // FindAll Payout Payments
  export type InputAttrs = {
    accessToken: string;
    gTenantId: string;
    periodStartDate: Date;
    periodEndDate: Date;
    settlementCurrencyIsoCode: string;
    payoutId?: string | null;
    pagination: {
      page: number;
      size: number;
      sortby?: string;
      keywords?: string;
    };
  };
  export type Result = Promise<Payments>;

  // Additional types
  export type Payments = {
    rows: Payment[];
    count: number;
    page: number;
    pageSize: number;
    pageCount: number;
    pageNumberIsGood: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    numberOfFirstItemOnPage: 0;
    firstItemOnPage: number;
    numberOfLastItemOnPage: number;
    lastItemOnPage: number;
  };

  export type Payment = {
    id: string;
    date: Date;
    status: string;
    amount: number;
    receivedAmount: number;
    feeAmount: number;
    payableAmount: number;
    profitAmount: number;
    paymentProcessorName: string;
    paymentMethodName: string;
    creditCardBrandName: string;
    installments: number;
    paymentProcessorId: string;
    reconciliationMethod: string;
    paymentProcessorConfirmation: string;
  };
}
