import { ClassConstructor } from '~/shared/types/class-constructor.type';

export namespace IJwtService {
  type SignOptions = {
    expiresIn: string;
  };

  export type JwtArgs<T> = {
    payload: T;
    subject: string;
    issuer?: string;
    signOptions: SignOptions;
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
