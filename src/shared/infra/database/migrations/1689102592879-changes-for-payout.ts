import { MigrationInterface, QueryRunner } from 'typeorm';
import { SqlScriptPaths } from '~/shared/infra/database/migrations/constants/scripts-path';
import { FileHelper } from '~/shared/infra/database/migrations/helpers/handle-file.helper';

export class changesForPayout1689102592879 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const upSql = FileHelper.read(SqlScriptPaths.CHANGES_FOR_PAYOUT_UP);
    await queryRunner.query(upSql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const downSql = FileHelper.read(SqlScriptPaths.CHANGES_FOR_PAYOUT_DOWN);
    await queryRunner.query(downSql);
  }
}
