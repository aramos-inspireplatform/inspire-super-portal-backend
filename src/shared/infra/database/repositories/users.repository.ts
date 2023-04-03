import { DataSource } from 'typeorm';
import { Users } from '~/shared/infra/database/entities';
import { UserModelToDomainMapper } from '~/shared/infra/database/mapper/user.mapper';
import { BaseRepository } from '~/shared/infra/database/repositories/base.repository';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

export class UserRepository
  extends BaseRepository<Users>
  implements IUserRepository
{
  constructor(dataSource: DataSource) {
    super(Users, dataSource.manager);
  }

  async findByEmail(
    attrs: IUserRepository.FindByEmailAttrs,
  ): IUserRepository.FindByEmailResult {
    const user = await this.createQueryBuilder('users')
      .leftJoinAndSelect('users.language', 'language')
      .where('users.email = :email', { email: attrs.email })
      .getOne();

    if (!user) return undefined;
    return UserModelToDomainMapper(user);
  }

  async updateUser(
    attrs: IUserRepository.UpdateUserAttrs,
  ): IUserRepository.UpdateUserResult {
    attrs.user.updatedDate = new Date();
    await this.update(
      {
        id: attrs.user.id,
      },
      attrs.user,
    );

    return UserModelToDomainMapper(
      await this.findOne({ where: { id: attrs.user.id } }),
    );
  }

  async findBySecurityToken(
    attrs: IUserRepository.FindBySecurityTokenAttrs,
  ): IUserRepository.FindBySecurityTokenResult {
    const user = await this.createQueryBuilder('users')
      .where('users.securityToken = :securityToken', {
        securityToken: attrs.securityToken,
      })
      .getOne();
    return UserModelToDomainMapper(user);
  }
}
