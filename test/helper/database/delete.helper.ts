import { EntityTarget } from 'typeorm';
import { dataSource } from '~/test/helper/create-application.helper';

// TODO: remove the comments if you want to use this function
// comments are here to prevent the coverage to look for this function
// export const databaseDeleteFromIds = async <T>({
//   entity,
//   ids,
// }: {
//   entity: EntityTarget<T>;
//   ids: Array<string>;
// }) => {
//   await dataSource
//     .createQueryBuilder()
//     .delete()
//     .from(entity)
//     .whereInIds(ids)
//     .execute();
// };

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
