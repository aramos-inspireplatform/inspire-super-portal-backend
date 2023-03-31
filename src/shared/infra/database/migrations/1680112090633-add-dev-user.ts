import { MigrationInterface, QueryRunner } from 'typeorm';

export class addDevUser1680112090633 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    if (process.env.NODE_ENV === 'development')
      await queryRunner.query(`
        INSERT INTO public.users (id, first_name, last_name, email, password_hash, access_failed_count, time_zone_id, language_id, created_date) 
        VALUES ('c90541b7-b2df-4f51-9797-1338846032ea', 'User', 'Test', 'teste@xyz.com', '$2b$12$5JpceJK/iek1Ws17zvi1L.bb.zwj2gxGqlHir.UJ4EM2kCtPjnVRS', 0, '37544be7-0c46-4e82-a8e3-c19aba32d9b9', 'e799d82c-5d60-44ef-b6c1-d4c24df7c118', NOW());
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    if (process.env.NODE_ENV === 'development')
      await queryRunner.query(`
        DELETE FROM public.users WHERE id = 'c90541b7-b2df-4f51-9797-1338846032ea';
    `);
  }
}
