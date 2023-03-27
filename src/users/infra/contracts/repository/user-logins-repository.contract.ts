import { UserLogin } from '~/users/domain/entities/user-login.entity';

export namespace IUserLoginsRepository {
  export type CreateAttrs = UserLogin;

  export type CreateResult = Promise<UserLogin>;
}

export interface IUserLoginsRepository {
  create(
    attrs: IUserLoginsRepository.CreateAttrs,
  ): IUserLoginsRepository.CreateResult;
}
