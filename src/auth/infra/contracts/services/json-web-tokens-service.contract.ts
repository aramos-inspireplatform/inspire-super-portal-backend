import { ClassConstructor } from '~/shared/types/class-constructor.type';

export namespace IJsonWebTokensService {
  export type JwtArgs<T> = {
    payload: T;
    subject?: string;
  };
}

export interface IJsonWebTokensService {
  sign<T>(args: IJsonWebTokensService.JwtArgs<T>): Promise<string>;

  validate<DecodedToken>(args: {
    token: string;
    throwableError?: ClassConstructor<Error>;
  }): Promise<Error | DecodedToken>;
}
