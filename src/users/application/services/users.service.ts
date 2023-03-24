import { ClassConstructor } from '~/shared/types/class-constructor.type';
import { IFindUserByEmail } from '~/users/application/services/contracts/find-user-by-email.contract';
import { User } from '~/users/domain/entities/user.entity';
import { UserNotFoundException } from '~/users/domain/exceptions/user-not-found.exception';
import { IUserRepository } from '~/users/infra/contracts/user-repository.contract';

export class UsersService implements IFindUserByEmail {
  constructor(private readonly userRepository: IUserRepository) {}

  async findByEmail(attrs: {
    email: string;
    throwableError?: ClassConstructor<Error>;
  }): Promise<User> {
    const user = await this.userRepository.findBy({
      field: 'email',
      value: attrs.email,
    });
    if (!user)
      throw attrs.throwableError
        ? new attrs.throwableError()
        : new UserNotFoundException();
    return user;
  }
}
