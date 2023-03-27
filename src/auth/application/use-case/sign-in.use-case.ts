import { InvalidCredentialsException } from '~/auth/domain/exceptions/unauthorized.exception';
import { IJsonWebTokensService } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { IPasswordHashService } from '~/auth/infra/contracts/services/password-hash-service.contract';
import { User } from '~/users/domain/entities/user.entity';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

export class SignInUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHashService: IPasswordHashService,
    private readonly accessTokenJwtService: IJsonWebTokensService,
    private readonly refreshTokenJwtService: IJsonWebTokensService,
  ) {}

  async signIn(args: { email: string; password: string }) {
    const user = await this.userRepository.findByEmail({
      email: args.email,
    });
    if (!user) throw new InvalidCredentialsException();
    const passwordMatches = await this.passwordHashService.compare({
      hash: user.passwordHash,
      plain: args.password,
    });

    if (!passwordMatches) await this.handleAuthFailed({ user });
    const [accessToken, refreshToken] = await Promise.all([
      this.accessTokenJwtService.sign({
        payload: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id,
        },
        subject: user.id,
      }),
      this.refreshTokenJwtService.sign({
        payload: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          id: user.id,
        },
        subject: user.id,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  private async handleAuthFailed({ user }: { user: User }) {
    user.incrementAccessFailedCount();
    await this.userRepository.updateUser({ user });
    throw new InvalidCredentialsException();
  }
}
