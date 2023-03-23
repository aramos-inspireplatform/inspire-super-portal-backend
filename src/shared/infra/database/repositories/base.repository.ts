import {
  EntityManager,
  EntityTarget,
  FindOptionsWhere,
  ObjectID,
  Repository,
  UpdateResult,
} from 'typeorm';

export class BaseRepository<T> extends Repository<T> {
  constructor(target: EntityTarget<T>, entityManager: EntityManager) {
    super(target, entityManager);
  }

  override async delete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindOptionsWhere<T>,
  ): Promise<UpdateResult> {
    return this.softDelete(criteria);
  }
}
