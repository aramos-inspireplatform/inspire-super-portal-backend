import { DataSource, Repository } from 'typeorm';
import { UserLogins } from '~/shared/infra/database/entities';
import { IUserLoginsRepository } from '~/users/infra/contracts/repository/user-logins-repository.contract';

export class UserLoginsRepository implements IUserLoginsRepository {
  repository: Repository<UserLogins>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.manager.getRepository<UserLogins>(UserLogins);
  }

  async create(
    userLogin: IUserLoginsRepository.CreateAttrs,
  ): IUserLoginsRepository.CreateResult {
    await this.repository.save(
      this.repository.create({
        user: { id: userLogin.userId },
        ...userLogin,
      }),
    );
    return userLogin;
  }
}
