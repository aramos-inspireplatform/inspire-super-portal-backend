import { MigrationInterface, QueryRunner } from 'typeorm';
import { SqlScriptPaths } from '~/shared/infra/database/migrations/constants/scripts-path';
import { FileHelper } from '~/shared/infra/database/migrations/helpers/handle-file.helper';

export class addTenantPayoutsPayInfo1689551860832
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const upSql = FileHelper.read(
      SqlScriptPaths.ADD_TENANT_PAYOUTS_PAY_INFO_UP,
    );
    await queryRunner.query(upSql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const downSql = FileHelper.read(
      SqlScriptPaths.ADD_TENANT_PAYOUTS_PAY_INFO_DOWN,
    );
    await queryRunner.query(downSql);
  }
}
