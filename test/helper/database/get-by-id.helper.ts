import { EntityTarget } from 'typeorm';
import { dataSource } from '~/test/helper/create-application.helper';

export const databaseFindByIdHelper = async <T>({
  entity,
  id,
}: {
  entity: EntityTarget<T>;
  id: string;
}) => {
  return dataSource
    .createQueryBuilder(entity, 'entity')
    .select()
    .where('id = :id', { id })
    .getOne();
};
