import { DataSource } from 'typeorm';
import { Users } from '~/shared/infra/database/entities';
import { UserModelToDomainMapper } from '~/shared/infra/database/mapper/user.mapper';
import { BaseRepository } from '~/shared/infra/database/repositories/base.repository';
import { IUserRepository } from '~/users/infra/contracts/user-repository.contract';

export class UserRepository
  extends BaseRepository<Users>
  implements IUserRepository
{
  constructor(dataSource: DataSource) {
    super(Users, dataSource.manager);
  }

  async findByEmail(attrs: IUserRepository.Params): IUserRepository.Result {
    const user = await this.findOneBy({ email: attrs.email });
    if (!user) return undefined;
    return UserModelToDomainMapper(user);
  }
}
