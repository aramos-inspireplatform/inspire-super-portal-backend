import { User } from '~/users/domain/entities/user.entity';

export namespace IUserRepository {
  export type Params = { email: string };
  export type Result = Promise<User | undefined>;
}

export interface IUserRepository {
  findByEmail(attrs: IUserRepository.Params): IUserRepository.Result;
}
