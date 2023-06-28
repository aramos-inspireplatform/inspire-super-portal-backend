import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { IFindOneAdminUserDao } from '~/users/application/queries/contracts/find-one-admin-user.dao.contract';

export class FindOneAdminUserDao implements IFindOneAdminUserDao {
  private readonly USERS_ROUTE = `${process.env.TENANT_URL}/user/admin-users`;

  constructor(
    private readonly inspireTenantApiService: IInspireTenantApiService,
    private readonly httpClient: IHttpClient,
  ) {}

  async execute(
    attrs: IFindOneAdminUserDao.Input,
  ): IFindOneAdminUserDao.Output {
    const url = `${this.USERS_ROUTE}/${attrs.userId}`;

    const response =
      await this.httpClient.get<IFindOneAdminUserDao.ApiResponse>(url, {
        headers: { authorization: attrs.accessToken },
      });
    if (response instanceof Error) throw response;

    return {
      id: response?.data?.body?.data.id,
      firstName: response?.data?.body?.data.firstName,
      lastName: response?.data?.body?.data.lastName,
      title: response?.data?.body?.data.title,
      email: response?.data?.body?.data.email,
      phoneNumber: response?.data?.body?.data.phoneNumber,
      phoneNumberCountryId: response?.data?.body?.data.phoneNumberCountryId,
      userType: response?.data?.body?.data.userType,
    };
  }
}
