import { MigrationInterface, QueryRunner } from 'typeorm';
import { SqlScriptPaths } from '~/shared/infra/database/migrations/constants/scripts-path';
import { FileHelper } from '~/shared/infra/database/migrations/helpers/handle-file.helper';

export class fixedFksAndIdxs1686714941437 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const upSql = FileHelper.read(SqlScriptPaths.FIXED_FKS_AND_IDXS_UP);
    await queryRunner.query(upSql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const downSql = FileHelper.read(SqlScriptPaths.FIXED_FKS_AND_IDXS_DOWN);
    await queryRunner.query(downSql);
  }
}
