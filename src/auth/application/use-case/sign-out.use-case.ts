import { UserNotFoundException } from '~/users/domain/exceptions/user-not-found.exception';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

export class SignOutUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async signOut(attrs: SignOutUseCase.InputAttrs) {
    const user = await this.userRepository.findById({ id: attrs.userId });
    if (!user) throw new UserNotFoundException();
    user.signOut();
    await this.userRepository.updateUser({ user });
  }
}

export namespace SignOutUseCase {
  export type InputAttrs = {
    userId: string;
  };
}
