/* eslint-disable @typescript-eslint/ban-types */

type ClassProperties<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T]
>;

export type InstanceProperties<T> = Omit<ClassProperties<T>, 'id'> & {
  id?: string;
};
