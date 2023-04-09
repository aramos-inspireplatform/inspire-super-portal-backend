import { MigrationInterface, QueryRunner } from 'typeorm';
import { SqlScriptPaths } from '~/shared/infra/database/migrations/constants/scripts-path';
import { FileHelper } from '~/shared/infra/database/migrations/helpers/handle-file.helper';

export class addSeedSchema1680095939156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const createSchemaSql = FileHelper.read(
      SqlScriptPaths.ADD_SEED_COUNTRIES_TIMEZONES_UP,
    );
    await queryRunner.query(createSchemaSql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const createSchemaSql = FileHelper.read(
      SqlScriptPaths.ADD_SEED_COUNTRIES_TIMEZONES_DOWN,
    );
    await queryRunner.query(createSchemaSql);
  }
}
