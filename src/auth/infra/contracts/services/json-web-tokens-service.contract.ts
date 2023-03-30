import { ClassConstructor } from '~/shared/types/class-constructor.type';

export namespace IJsonWebTokensGenerator {
  export type JwtArgs<T> = {
    payload: T;
    subject?: string;
  };
}

export interface IJsonWebTokensGenerator {
  sign<T>(args: IJsonWebTokensGenerator.JwtArgs<T>): Promise<string>;

  validate<DecodedToken>(args: {
    token: string;
    throwableError?: ClassConstructor<Error>;
  }): Promise<Error | DecodedToken>;
}
