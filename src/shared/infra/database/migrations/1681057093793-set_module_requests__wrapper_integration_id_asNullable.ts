import { MigrationInterface, QueryRunner } from 'typeorm';

export class setModuleRequests_wrapperIntegrationIdAsNullable1681057093793
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table module_requests alter column wrapper_integration_id drop not null;`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
