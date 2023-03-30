import { UpdateEntityType } from '~/shared/types/update-entity.type';
import { User } from '~/users/domain/entities/user.entity';

export namespace IUserRepository {
  export type FindByEmailAttrs = { email: string };
  export type FindByEmailResult = Promise<User | undefined>;

  export type UpdateUserAttrs = {
    user: UpdateEntityType<User>;
  };
  export type UpdateUserResult = Promise<User>;

  export type FindBySecurityTokenAttrs = { securityToken: string };
  export type FindBySecurityTokenResult = Promise<User>;
}

export interface IUserRepository {
  findByEmail(
    attrs: IUserRepository.FindByEmailAttrs,
  ): IUserRepository.FindByEmailResult;

  updateUser(
    attrs: IUserRepository.UpdateUserAttrs,
  ): IUserRepository.UpdateUserResult;

  findBySecurityToken(
    attrs: IUserRepository.FindBySecurityTokenAttrs,
  ): IUserRepository.FindBySecurityTokenResult;
}
