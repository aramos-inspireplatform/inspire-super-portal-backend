import { InvalidCredentialsException } from '~/auth/domain/exceptions/unauthorized.exception';
import { IJwtService } from '~/auth/infra/json-web-tokens/services/jwt.service';
import { IPasswordHashService } from '~/auth/infra/password-hash/services/password-hash.service';
import { ClassContructor } from '~/shared/types/class-constructor.type';

export namespace AuthSignInService {
  export type AuthUser = {
    id: string;
    passwordHash: string;
    email: string;
  };
}

export class AuthSignInService<
  TUser extends AuthSignInService.AuthUser = AuthSignInService.AuthUser,
> {
  constructor(
    private readonly passwordHashService: IPasswordHashService,
    private readonly jwtService: IJwtService,
  ) {}

  async signIn(args: {
    user: TUser;
    password: string;
    throwableError?: ClassContructor<Error>;
  }) {
    const isValidPassword = await this.passwordHashService.compare({
      hash: args.user.passwordHash,
      plain: args.password,
    });
    if (!isValidPassword)
      throw args.throwableError
        ? new args.throwableError()
        : new InvalidCredentialsException();

    const accessToken = await this.jwtService.sign({
      signOptions: {
        expiresIn: process.env.JWT_EXPIRE_IN as string,
      },
      payload: {
        email: args.user.email,
      },
      subject: args.user.id,
      issuer: process.env.JWT_ISSUER,
    });
    const refreshToken = await this.jwtService.sign({
      signOptions: {
        expiresIn: process.env.JWT_EXPIRE_IN as string,
      },
      payload: {
        email: args.user.email,
      },
      subject: args.user.id,
      issuer: process.env.JWT_ISSUER,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
