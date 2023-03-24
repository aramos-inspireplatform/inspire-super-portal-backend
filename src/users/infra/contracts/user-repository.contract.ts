import { User } from '~/users/domain/entities/user.entity';

export interface IUserRepository {
  findBy(attrs: { field: string; value: any }): Promise<User>;
}
