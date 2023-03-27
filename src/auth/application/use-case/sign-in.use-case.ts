import { randomUUID } from 'crypto';
import { InvalidCredentialsException } from '~/auth/domain/exceptions/unauthorized.exception';
import { IJsonWebTokensService } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { IPasswordHashService } from '~/auth/infra/contracts/services/password-hash-service.contract';
import { UserLogin } from '~/users/domain/entities/user-login.entity';
import { User } from '~/users/domain/entities/user.entity';
import { IUserLoginsRepository } from '~/users/infra/contracts/repository/user-logins-repository.contract';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

export namespace SignInUseCase {
  export type SignInUseCaseAttrs = {
    email: string;
    password: string;
    ipAddress: string;
    userAgent: string;
  };
}

export class SignInUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHashService: IPasswordHashService,
    private readonly accessTokenJwtService: IJsonWebTokensService,
    private readonly refreshTokenJwtService: IJsonWebTokensService,
    private readonly userLoginsRepository: IUserLoginsRepository,
  ) {}

  async signIn(args: SignInUseCase.SignInUseCaseAttrs) {
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
    await this.handleNewUserLogin({
      user,
      ipAddress: args.ipAddress,
      userAgent: args.userAgent,
    });
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

  private async handleNewUserLogin({
    user,
    userAgent,
    ipAddress,
  }: {
    user: User;
    userAgent: string;
    ipAddress: string;
  }) {
    await this.userLoginsRepository.create(
      new UserLogin({
        createdDate: new Date(),
        id: randomUUID(), //TODO: needs to fix this part, missing informations of how we will make this id,
        ipAddress,
        userAgent,
        userId: user.id,
      }),
    );
  }
}
