import { join } from 'path';

const SCRIPTS_FOLDER = join(__dirname, '..', 'scripts');

export const SqlScriptPaths = {
  CREATE_SCHEMA_UP: `${SCRIPTS_FOLDER}/1679509394329-create-schema.up.sql`,
  CREATE_SCHEMA_DOWN: `${SCRIPTS_FOLDER}/1679509394329-create-schema.down.sql`,
  ADD_SEED_SCHEMA_UP: `${SCRIPTS_FOLDER}/1680095939156-add-seed-schema.up.sql`,
  ADD_SEED_SCHEMA_DOWN: `${SCRIPTS_FOLDER}/1680095939156-add-seed-schema.down.sql`,
  FIXED_FKS_AND_IDXS_UP: `${SCRIPTS_FOLDER}/1686714941437-fixed-fks-and-idxs.up.sql`,
  FIXED_FKS_AND_IDXS_DOWN: `${SCRIPTS_FOLDER}/1686714941437-fixed-fks-and-idxs.down.sql`,
  ADD_INTEGRATION_CODE_UP: `${SCRIPTS_FOLDER}/1686720397094-add-integration-code.up.sql`,
  ADD_INTEGRATION_CODE_DOWN: `${SCRIPTS_FOLDER}/1686720397094-add-integration-code.down.sql`,
  CHANGES_FOR_PAYOUT_UP: `${SCRIPTS_FOLDER}/1689102592879-changes-for-payout.up.sql`,
  CHANGES_FOR_PAYOUT_DOWN: `${SCRIPTS_FOLDER}/1689102592879-changes-for-payout.down.sql`,
  ADD_TENANT_PAYOUTS_PAY_INFO_UP: `${SCRIPTS_FOLDER}/1689551860832-add-tenant-payouts-pay-info.up.sql`,
  ADD_TENANT_PAYOUTS_PAY_INFO_DOWN: `${SCRIPTS_FOLDER}/1689551860832-add-tenant-payouts-pay-info.down.sql`,
  ADD_PAYOUT_MANAGEMENT_UP: `${SCRIPTS_FOLDER}/1693500212248-add-payout-management.up.sql`,
  ADD_PAYOUT_MANAGEMENT_DOWN: `${SCRIPTS_FOLDER}/1693500212248-add-payout-management.down.sql`,
  ADD_ZOOP_PAYMENT_PROCESSOR_UP: `${SCRIPTS_FOLDER}/1694101690729-add-zoop-payment-processor.up.sql`,
  ADD_ZOOP_PAYMENT_PROCESSOR_DOWN: `${SCRIPTS_FOLDER}/1694101690729-add-zoop-payment-processor.down.sql`,
  ADD_PAYA_PAYMENT_PROCESSOR_UP: `${SCRIPTS_FOLDER}/1698263808392-add-paya-payment-processor.up.sql`,
  ADD_PAYA_PAYMENT_PROCESSOR_DOWN: `${SCRIPTS_FOLDER}/1698263808392-add-paya-payment-processor.down.sql`,
} as const;
