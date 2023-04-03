import { InvalidResetPasswordSecurityToken } from '~/auth/domain/exceptions/invalid-reset-password-security-token.exception';
import { PasswordAndConfirmationPasswordShouldBeEqualException } from '~/auth/domain/exceptions/password-and-confirmation-password-should-be-equal.exception';
import { IJsonWebTokensGenerator } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { IPasswordHashService } from '~/auth/infra/contracts/services/password-hash-service.contract';
import { UserNotFoundException } from '~/users/domain/exceptions/user-not-found.exception';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

export class PasswordResetUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordHash: IPasswordHashService,
    private readonly resetPasswordJwtGenerator: IJsonWebTokensGenerator,
  ) {}

  async resetPassword(attrs: PasswordResetUseCase.InpuAttrs) {
    const decodedTokenOrError = await this.resetPasswordJwtGenerator.validate({
      token: attrs.securityToken,
    });
    if (decodedTokenOrError instanceof Error)
      throw new InvalidResetPasswordSecurityToken();
    const user = await this.userRepository.findBySecurityToken({
      securityToken: attrs.securityToken,
    });
    if (!user) throw new UserNotFoundException();
    if (attrs.confirmationPassword !== attrs.password)
      throw new PasswordAndConfirmationPasswordShouldBeEqualException();
    user.passwordHash = await this.passwordHash.hashPassword({
      password: attrs.password,
    });
    user.securityToken = null;
    await this.userRepository.updateUser({ user });
  }
}

export namespace PasswordResetUseCase {
  export type InpuAttrs = {
    securityToken: string;
    password: string;
    confirmationPassword: string;
  };
}
