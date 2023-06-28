import { IFindOneUserDao } from '~/users/application/queries/contracts/find-one-user.dao.contract';
import { IFindOneUserQuery } from '~/users/application/queries/contracts/find-one-user.query.contract';

export class FindOneUserQuery implements IFindOneUserQuery {
  constructor(private readonly findOneUserDao: IFindOneUserDao) {}

  async execute(attrs: IFindOneUserQuery.Input): IFindOneUserQuery.Output {
    const user = await this.findOneUserDao.execute({
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
