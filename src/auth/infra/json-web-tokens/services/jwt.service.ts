import { ClassConstructor } from '~/shared/types/class-constructor.type';

export namespace IJwtService {
  export type JwtArgs<T> = {
    payload: T;
    subject: string;
  };
}

export interface IJwtService {
  sign<T>(args: IJwtService.JwtArgs<T>): Promise<string>;

  validateAccessToken<DecodedToken>(args: {
    token: string;
    throwableError?: ClassConstructor<Error>;
  }): Promise<Error | DecodedToken>;

  validateRefreshToken<DecodedToken>(args: {
    token: string;
    throwableError?: ClassConstructor<Error>;
  }): Promise<Error | DecodedToken>;
}
