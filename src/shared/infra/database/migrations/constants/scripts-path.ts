import { join } from 'path';

const SCRIPTS_FOLDER = join(__dirname, '..', 'scripts');

export const SqlScriptPaths = {
  CREATE_SCHEMA_UP: `${SCRIPTS_FOLDER}/1679509394329-create-schema.up.sql`,
  CREATE_SCHEMA_DOWN: `${SCRIPTS_FOLDER}/1679509394329-create-schema.down.sql`,
  ADD_SEED_COUNTRIES_TIMEZONES_UP: `${SCRIPTS_FOLDER}/1680095939156-add-seed-countries-timezones.up.sql`,
  ADD_SEED_COUNTRIES_TIMEZONES_DOWN: `${SCRIPTS_FOLDER}/1680095939156-add-seed-countries-timezones.down.sql`,
} as const;
