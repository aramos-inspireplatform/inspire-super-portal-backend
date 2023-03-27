import { EntityTarget } from 'typeorm';
import { dataSource } from '~/test/helper/create-application.helper';

export const databaseInsert = async <T>({
  entity,
  values,
}: {
  entity: EntityTarget<T>;
  values: Array<T>;
}) => {
  await dataSource
    .createQueryBuilder()
    .insert()
    .into(entity)
    .values(values as any)
    .execute();
};
