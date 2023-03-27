/* eslint-disable @typescript-eslint/ban-types */
export type InstanceProperties<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends Function ? never : K;
  }[keyof T]
>;
