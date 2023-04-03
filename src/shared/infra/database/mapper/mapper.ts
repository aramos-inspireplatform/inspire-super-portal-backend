export function Mapper<TIn, TOut>(
  inClazz: TIn | undefined,
  castFunction: (value: TIn) => TOut,
): TOut | undefined {
  return inClazz ? castFunction(inClazz) : undefined;
}
