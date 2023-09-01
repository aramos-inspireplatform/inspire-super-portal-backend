import { MigrationInterface, QueryRunner } from 'typeorm';
import { SqlScriptPaths } from './constants/scripts-path';
import { FileHelper } from '~/shared/infra/database/migrations/helpers/handle-file.helper';

export class addPayoutManagement1693500212248 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = FileHelper.read(SqlScriptPaths.ADD_PAYOUT_MANAGEMENT_UP);
    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = FileHelper.read(SqlScriptPaths.ADD_PAYOUT_MANAGEMENT_DOWN);
    await queryRunner.query(query);
  }
}
