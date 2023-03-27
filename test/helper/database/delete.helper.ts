import { EntityTarget } from 'typeorm';
import { dataSource } from '~/test/helper/create-application.helper';

export const databaseDeleteFromEntities = async <T>({
  entity,
  values,
}: {
  entity: EntityTarget<T>;
  values: Array<T>;
}) => {
  await dataSource
    .createQueryBuilder()
    .delete()
    .from(entity)
    .whereInIds(values.map((entity) => (entity as any)?.id))
    .execute();
};

export const databaseClearTableFromEntity = async <T>({
  entity,
}: {
  entity: EntityTarget<T>;
}) => {
  await dataSource.createQueryBuilder().delete().from(entity).execute();
};
