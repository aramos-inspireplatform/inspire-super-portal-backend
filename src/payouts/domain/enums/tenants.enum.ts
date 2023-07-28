export namespace TenantsEnum {
  export enum Ids {}

  export enum Slugs {}

  export enum Exceptions {
    NOT_FOUND = 'exception:TENANT_NOT_FOUND',
    NAME_IS_REQUIRED = 'exception:TENANT_NAME_IS_REQUIRED',
    NAME_MAX_CHARACTERS = 'exception:TENANT_NAME_MAX_CHARACTERS_100',
    GTENANTID_IS_REQUIRED = 'exception:TENANT_GTENANTID_IS_REQUIRED',
    GTENANTID_MAX_CHARACTERS = 'exception:TENANT_GTENANTID_MAX_CHARACTERS_100',
    AGENCY_ID_IS_REQUIRED = 'exception:TENANT_AGENCY_ID_IS_REQUIRED',
    AGENCY_ID_IS_MUST_BE_UUID = 'exception:TENANT_AGENCY_ID_IS_MUST_BE_UUID',
    AGENCY_NAME_IS_REQUIRED = 'exception:TENANT_AGENCY_NAME_IS_REQUIRED',
    AGENCY_NAME_MAX_CHARACTERS = 'exception:TENANT_NAME_MAX_CHARACTERS_100',
    TERMS_RECURRING_INTERVAL_COUNT_IS_REQUIRED = 'exception:TENANT_TERMS_RECURRING_INTERVAL_COUNT_IS_REQUIRED',
    TERMS_RECURRING_INTERVAL_COUNT_MUST_BE_GREATER_THEN_ZERO = 'exception:TENANT_TERMS_RECURRING_INTERVAL_COUNT_MUST_BE_GREATER_THAN_ZERO',
    TERMS_RECURRING_INTERVAL_IS_REQUIRED = 'exception:TENANT_TERMS_RECURRING_INTERVAL_IS_REQUIRED',
    TOTAL_PAID_AMOUNT_IS_REQUIRED = 'exception:TENANT_TOTAL_PAID_AMOUNT_IS_REQUIRED',
    TOTAL_PAID_AMOUNT_MUST_BE_GREATER_OR_EQUAL_THEN_ZERO = 'exception:TENANT_TOTAL_PAID_AMOUNT_MUST_BE_GREATER_OR_EQUAL_THEN_ZERO',
    TENANT_BALANCES_MUST_HAVE_ONE_OF_EACH_SETTLEMENT_CURRENCY = 'exception:TENANT_TENANT_BALANCES_MUST_HAVE_ONE_OF_EACH_SETTLEMENT_CURRENCY',
    LAST_TENANT_PAYOUT_STATUS_MUST_BE_PROCESSED = 'exception:TENANT_LAST_TENANT_PAYOUT_STATUS_MUST_BE_PROCESSED',
  }
}
