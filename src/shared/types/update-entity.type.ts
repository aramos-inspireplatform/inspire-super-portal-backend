import { InstanceProperties } from '~/shared/types/class-properties.type';

export type UpdateEntityType<T extends { id: string }> = Omit<
  Partial<InstanceProperties<T>>,
  'id'
> &
  Pick<T, 'id'>;
