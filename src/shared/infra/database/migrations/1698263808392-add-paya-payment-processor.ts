import { MigrationInterface, QueryRunner } from 'typeorm';
import { SqlScriptPaths } from '~/shared/infra/database/migrations/constants/scripts-path';
import { FileHelper } from '~/shared/infra/database/migrations/helpers/handle-file.helper';

export class AddPayaPaymentProcessor1698263808392
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const upSql = FileHelper.read(SqlScriptPaths.ADD_ZOOP_PAYMENT_PROCESSOR_UP);
    await queryRunner.query(upSql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const downSql = FileHelper.read(
      SqlScriptPaths.ADD_ZOOP_PAYMENT_PROCESSOR_DOWN,
    );
    await queryRunner.query(downSql);
  }
}
