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
} as const;
