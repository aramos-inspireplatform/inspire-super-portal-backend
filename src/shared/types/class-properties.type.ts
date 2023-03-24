export type InstanceProperties<T> = Pick<
  T,
  {
    [K in keyof T]: T[K] extends abstract new (...args: any[]) => void
      ? never
      : K;
  }[keyof T]
>;
