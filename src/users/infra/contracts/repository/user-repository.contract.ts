import { UpdateEntityType } from '~/shared/types/update-entity.type';
import { User } from '~/users/domain/entities/user.entity';

export namespace IUserRepository {
  export type FindByEmailArgs = { email: string };
  export type FindByEmailResult = Promise<User | undefined>;

  export type UpdateUserArgs = {
    user: UpdateEntityType<User>;
  };
  export type UpdateUserResult = User;

  export type FindByIdArgs = { id: string };
  export type FindByIdResult = Promise<User | undefined>;
}

export interface IUserRepository {
  findByEmail(
    attrs: IUserRepository.FindByEmailArgs,
  ): IUserRepository.FindByEmailResult;

  findById(attrs: IUserRepository.FindByIdArgs): IUserRepository.FindByIdResult;

  updateUser(
    attrs: IUserRepository.UpdateUserArgs,
  ): Promise<IUserRepository.UpdateUserResult>;
}
