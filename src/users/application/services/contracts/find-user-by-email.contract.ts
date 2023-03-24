import { ClassConstructor } from '~/shared/types/class-constructor.type';
import { User } from '~/users/domain/entities/user.entity';

export interface IFindUserByEmail {
  findByEmail(attrs: {
    email: string;
    throwableError?: ClassConstructor<Error>;
  }): Promise<User>;
}
