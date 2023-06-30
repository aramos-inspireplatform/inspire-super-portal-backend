import { IFindAllUserAgenciesDao } from '~/agencies/application/daos/find-all-user-agencies.dao.contract';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class FindAllUserAgenciesDao implements IFindAllUserAgenciesDao {
  private USER_ROUTE = `${process.env.TENANT_URL}/user/admin-users`;

  constructor(
    private readonly inspireTenantApiService: IInspireTenantApiService,
    private readonly httpClient: IHttpClient,
  ) {}

  async execute(
    attrs: IFindAllUserAgenciesDao.Input,
  ): IFindAllUserAgenciesDao.Output {
    const url = `${this.USER_ROUTE}/${attrs.userId}/agencies`;

    const response =
      await this.httpClient.get<IFindAllUserAgenciesDao.ApiResponse>(url, {
        headers: {
          authorization: attrs.accessToken,
        },
      });
    if (response instanceof Error) throw response;

    return response?.data?.body?.data?.map((agency) => ({
      id: agency.id,
      name: agency.name,
      defaultTenantId: agency.defaultTenantId
        ? {
            id: agency.defaultTenantId.id,
            name: agency.defaultTenantId.name,
            settings: agency.defaultTenantId.settings,
          }
        : null,
    }));
  }
}
