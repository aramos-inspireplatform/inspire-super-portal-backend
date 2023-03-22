export function Mapper<TIn, TOut>(
  inClazz: TIn,
  castFunction: (value: TIn) => TOut,
): TOut {
  return castFunction(inClazz);
}
