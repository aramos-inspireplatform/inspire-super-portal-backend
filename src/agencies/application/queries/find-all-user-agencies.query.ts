import { IFindAllUserAgenciesDao } from '~/agencies/application/daos/find-all-user-agencies.dao.contract';
import { IFindAllUserAgenciesQuery } from '~/agencies/application/queries/contracts/find-all-user-agencies.query.contract';

export class FindAllUserAgenciesQuery implements IFindAllUserAgenciesQuery {
  constructor(
    private readonly findAllUserAgenciesDao: IFindAllUserAgenciesDao,
  ) {}

  async execute(
    attrs: IFindAllUserAgenciesQuery.Input,
  ): IFindAllUserAgenciesQuery.Output {
    const agencies = await this.findAllUserAgenciesDao.execute({
      accessToken: attrs.accessToken,
      userId: attrs.userId,
    });

    return agencies?.map((agency) => ({
      id: agency.id,
      name: agency.name,
      defaultTenant: agency.defaultTenantId
        ? {
            id: agency.defaultTenantId.id,
            name: agency.defaultTenantId.name,
            settings: agency.defaultTenantId.settings,
          }
        : null,
    }));
  }
}
