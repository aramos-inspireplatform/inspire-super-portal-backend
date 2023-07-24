export const IgnoredPropertyName = Symbol('IgnoredPropertyName');

export function IgnoreInterceptor() {
  return function customInterceptorIgnore(
    target: unknown,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    // eslint-disable-next-line no-param-reassign
    descriptor.value[IgnoredPropertyName] = true;
  };
}
