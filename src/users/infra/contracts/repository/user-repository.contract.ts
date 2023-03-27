import { UpdateEntityType } from '~/shared/types/update-entity.type';
import { User } from '~/users/domain/entities/user.entity';

export namespace IUserRepository {
  export type FindByEmailParams = { email: string };
  export type FindByEmailResult = Promise<User | undefined>;

  export type UpdateUserParams = {
    user: UpdateEntityType<User>;
  };
  export type UpdateUserResult = User;
}

export interface IUserRepository {
  findByEmail(
    attrs: IUserRepository.FindByEmailParams,
  ): IUserRepository.FindByEmailResult;

  updateUser(
    attrs: IUserRepository.UpdateUserParams,
  ): Promise<IUserRepository.UpdateUserResult>;
}
