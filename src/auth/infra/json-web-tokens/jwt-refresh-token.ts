import { sign, verify } from 'jsonwebtoken';
import { IJsonWebTokensGenerator } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { ClassConstructor } from '~/shared/types/class-constructor.type';

export class JwtRefreshTokenService implements IJsonWebTokensGenerator {
  constructor(
    private readonly jwtSecret: string,
    private readonly jwtExpiration: string,
    private readonly jwtIssuer: string,
  ) {}

  async sign<T>(args: IJsonWebTokensGenerator.JwtArgs<T>): Promise<string> {
    return sign(args.payload as any, this.jwtSecret, {
      subject: args.subject,
      issuer: this.jwtIssuer,
      expiresIn: this.jwtExpiration,
    });
  }

  async validate<DecodedToken>(args: {
    token: string;
    throwableError?: ClassConstructor<Error>;
  }): Promise<Error | DecodedToken> {
    try {
      return verify(args.token, this.jwtSecret) as any;
    } catch (error) {
      throw args.throwableError ? new args.throwableError() : error;
    }
  }
}
