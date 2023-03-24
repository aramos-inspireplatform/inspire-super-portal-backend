import { ISignInService } from '~/auth/application/service/contracts/sign-in.contract';
import { InvalidCredentialsException } from '~/auth/domain/exceptions/unauthorized.exception';
import { IJsonWebTokensService } from '~/auth/infra/contracts/json-web-tokens-service.contract';
import { IPasswordHashService } from '~/auth/infra/contracts/password-hash-service.contract';

export class AuthSignInService implements ISignInService {
  constructor(
    private readonly passwordHashService: IPasswordHashService,
    private readonly accessTokenJwtService: IJsonWebTokensService,
    private readonly refreshTokenJwtService: IJsonWebTokensService,
  ) {}

  async signIn(
    args: ISignInService.Args<ISignInService.AuthUser>,
  ): Promise<ISignInService.Result> {
    const isValidPassword = await this.passwordHashService.compare({
      hash: args.user.passwordHash,
      plain: args.password,
    });
    if (!isValidPassword)
      throw args.throwableError
        ? new args.throwableError()
        : new InvalidCredentialsException();
    const accessToken = await this.accessTokenJwtService.sign({
      payload: {
        email: args.user.email,
      },
      subject: args.user.id,
    });
    const refreshToken = await this.refreshTokenJwtService.sign({
      payload: {
        email: args.user.email,
      },
      subject: args.user.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
