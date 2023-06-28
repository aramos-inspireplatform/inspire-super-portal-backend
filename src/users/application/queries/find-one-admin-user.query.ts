import { IFindOneAdminUserDao } from '~/users/application/queries/contracts/find-one-admin-user.dao.contract';
import { IFindOneAdminUserQuery } from '~/users/application/queries/contracts/find-one-admin-user.query.contract';

export class FindOneAdminUserQuery implements IFindOneAdminUserQuery {
  constructor(private readonly findOneAdminUserDao: IFindOneAdminUserDao) {}

  async execute(
    attrs: IFindOneAdminUserQuery.Input,
  ): IFindOneAdminUserQuery.Output {
    const user = await this.findOneAdminUserDao.execute({
      accessToken: attrs.accessToken,
      userId: attrs.userId,
    });

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      title: user.title,
      email: user.email,
      phoneNumber: user.phoneNumber,
      phoneNumberCountryId: user.phoneNumberCountryId,
      userType: user.userType,
    };
  }
}
