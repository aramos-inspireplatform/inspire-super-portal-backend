import { MigrationInterface, QueryRunner } from 'typeorm';
import { SqlScriptPaths } from '~/shared/infra/database/migrations/constants/scripts-path';
import { FileHelper } from '~/shared/infra/database/migrations/helpers/handle-file.helper';

export class addIntegrationCode1686720397094 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const upSql = FileHelper.read(SqlScriptPaths.ADD_INTEGRATION_CODE_UP);
    await queryRunner.query(upSql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const downSql = FileHelper.read(SqlScriptPaths.ADD_INTEGRATION_CODE_DOWN);
    await queryRunner.query(downSql);
  }
}
