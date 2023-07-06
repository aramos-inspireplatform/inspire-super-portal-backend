import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';
import { IFindOneAdminUserDao } from '~/users/application/daos/find-one-admin-user.dao.contract';

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
      id: response?.data?.body?.data?.id,
      firstName: response?.data?.body?.data?.firstName,
      lastName: response?.data?.body?.data?.lastName,
      title: response?.data?.body?.data?.title,
      email: response?.data?.body?.data?.email,
      status: response?.data?.body?.data?.adminBlockedDate
        ? 'Inactive'
        : 'Active',
      phoneNumber: response?.data?.body?.data?.phoneNumber,
      phoneNumberCountryId: response?.data?.body?.data?.phoneNumberCountryId,
      adminBlockedDate: response?.data?.body?.data?.adminBlockedDate,
      userTypeId: response?.data?.body?.data?.userTypeId
        ? {
            id: response?.data?.body?.data?.userTypeId.id,
            name: response?.data?.body?.data?.userTypeId.name,
            slug: response?.data?.body?.data?.userTypeId.slug,
          }
        : null,
      agencies: response?.data?.body?.data?.agencies?.length
        ? response?.data?.body?.data?.agencies.map((agency) => ({
            id: agency.id,
            name: agency.name,
            logo: agency.logo,
          }))
        : null,
    };
  }
}
