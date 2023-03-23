// TODO: move to the jwt options from lib
type SignOptions = {
  expiresIn: string;
};

type JwtArgs<T> = {
  payload: T;
  subject: string;
  issuer?: string;
  signOptions: SignOptions;
};

export type ClassContructor<T> = new () => T;

export interface IJwtService {
  sign<T>(args: JwtArgs<T>): Promise<string>;

  validateAccessToken<DecodedToken>(args: {
    token: string;
    throwableError?: ClassContructor<Error>;
  }): Promise<Error | DecodedToken>;

  validateRefreshToken<DecodedToken>(args: {
    token: string;
    throwableError?: ClassContructor<Error>;
  }): Promise<Error | DecodedToken>;
}
