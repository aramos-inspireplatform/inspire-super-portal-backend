export namespace PayoutProvidersSymbols {
  export const Commands = {
    RECONCILIATE_STRIPE: Symbol('RECONCILIATE_STRIPE_COMMAND'),
    RECONCILIATE_BEXS: Symbol('RECONCILIATE_BEXS_COMMAND'),
    CREATE_PAYOUT: Symbol('CREATE_PAYOUT_COMMAND'),
    SYNCHRONIZE_TENANT_BALANCE: Symbol('SYNCHRONIZE_TENANT_BALANCE_COMMAND'),
  };

  export const Daos = {
    FIND_ALL_PAYMENTS_PERIOD_PAGED: Symbol(
      'FIND_ALL_PAYMENTS_PERIOD_PAGED_DAO',
    ),
    FIND_ALL_PAYMENTS_PERIOD: Symbol('FIND_ALL_PAYMENTS_PERIOD_DAO'),
    FIND_ALL_PAYOUT_PAYMENTS_PAGED: Symbol(
      'FIND_ALL_PAYOUT_PAYMENTS_PAGED_DAO',
    ),
    FIND_ALL_TENANT_PAYOUT_PAGED: Symbol('FIND_ALL_TENANT_PAYOUT_PAGED_DAO'),
    FIND_ALL_TENANT_BALANCES_PAGED: Symbol(
      'FIND_ALL_TENANT_BALANCES_PAGED_DAO',
    ),
    FIND_ONE_TENANT_BALANCE: Symbol('FIND_ONE_TENANT_BALANCE_DAO'),
    FIND_ALL_PAYOUT_ADJUSTMENTS: Symbol('FIND_ALL_PAYOUT_ADJUSTMENTS_DAO'),
    FIND_ALL_PAYOUT_ADJUSTMENT_TYPES: Symbol(
      'FIND_ALL_PAYOUT_ADJUSTMENT_TYPES_DAO',
    ),
    FIND_ONE_TENANT_PAYOUT: Symbol('FIND_ONE_TENANT_PAYOUT_DAO'),
    FIND_ONE_PAYOUT_SUMMARY: Symbol('FIND_ONE_PAYOUT_SUMMARY_DAO'),
    FIND_ONE_PAYOUT_SUMMARY_PREVIEW: Symbol(
      'FIND_ONE_PAYOUT_SUMMARY_PREVIEW_DAO',
    ),
  };

  export const Queries = {
    FIND_ALL_PAYMENTS_PERIOD_PAGED: Symbol(
      'FIND_ALL_PAYMENTS_PERIOD_PAGED_QUERY',
    ),
    FIND_ALL_PAYMENTS_PERIOD: Symbol('FIND_ALL_PAYMENTS_PERIOD_QUERY'),
    FIND_ALL_PAYOUT_PAYMENTS_PAGED: Symbol(
      'FIND_ALL_PAYOUT_PAYMENTS_PAGED_QUERY',
    ),
    FIND_ALL_TENANT_PAYOUT_PAGED: Symbol('FIND_ALL_TENANT_PAYOUT_PAGED_QUERY'),
    FIND_ALL_TENANT_BALANCES_PAGED: Symbol(
      'FIND_ALL_TENANT_BALANCES_PAGED_QUERY',
    ),
    FIND_ONE_TENANT_BALANCE: Symbol('FIND_ONE_TENANT_BALANCE_QUERY'),
    FIND_ALL_PAYOUT_ADJUSTMENTS: Symbol('FIND_ALL_PAYOUT_ADJUSTMENTS_QUERY'),
    FIND_ALL_PAYOUT_ADJUSTMENT_TYPES: Symbol(
      'FIND_ALL_PAYOUT_ADJUSTMENT_TYPES_QUERY',
    ),
    FIND_ONE_TENANT_PAYOUT: Symbol('FIND_ONE_TENANT_PAYOUT_QUERY'),
    FIND_ONE_PAYOUT_SUMMARY: Symbol('FIND_ONE_PAYOUT_SUMMARY_QUERY'),
    FIND_ONE_PAYOUT_SUMMARY_PREVIEW: Symbol(
      'FIND_ONE_PAYOUT_SUMMARY_PREVIEW_QUERY',
    ),
  };

  export const Repositories = {
    TENANT: Symbol('PAYOUTS_TENANT_REPOSITORY'),
    TENANT_STATUS: Symbol('TENANT_STATUS_REPOSITORY'),
    PAYOUT: Symbol('PAYOUTS_PAYOUT_REPOSITORY'),
  };

  export const Services = {};
}
