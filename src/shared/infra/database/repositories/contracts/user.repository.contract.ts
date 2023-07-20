import { UsersEntity } from '~/users/domain/entities/users.entity';

export interface IUserRepository {
  save(input: UsersEntity): Promise<void>;
}

export namespace IUserRepository {
  //
}
