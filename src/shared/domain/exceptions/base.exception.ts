export abstract class BaseException extends Error {
  constructor(
    readonly customMessage: string | object | any,
    readonly statusCode: number = 500,
    readonly details?: string | string[],
  ) {
    super();
  }
}
