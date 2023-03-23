// TODO: move to the jwt options from lib
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
export type ClassContructor<T> = new () => T;

export interface IJwtService {
  sign<T>(args: IJwtService.JwtArgs<T>): Promise<string>;

  validateAccessToken<DecodedToken>(args: {
    token: string;
    throwableError?: ClassContructor<Error>;
  }): Promise<Error | DecodedToken>;

  validateRefreshToken<DecodedToken>(args: {
    token: string;
    throwableError?: ClassContructor<Error>;
  }): Promise<Error | DecodedToken>;
}
