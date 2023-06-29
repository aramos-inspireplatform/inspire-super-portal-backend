import { IFindAllAgenciesDao } from '~/agencies/application/daos/find-all-agencies.dao.contract';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { IHttpClient } from '~/shared/infra/http/contracts/http-client.contract';

export class FindAllAgenciesDao implements IFindAllAgenciesDao {
  private readonly AGENCIES_ROUTE = `${process.env.TENANT_URL}/agencies`;

  constructor(
    private readonly inspireTenantApiService: IInspireTenantApiService,
    private readonly httpClient: IHttpClient,
  ) {}

  async execute(attrs: IFindAllAgenciesDao.Input): IFindAllAgenciesDao.Output {
    const url = this.buildUrl(attrs);

    const response = await this.httpClient.get<IFindAllAgenciesDao.ApiResponse>(
      url,
      {
        headers: { authorization: attrs.accessToken },
      },
    );
    if (response instanceof Error) throw response;

    return {
      rows: response.data.body.data.rows.map((agency) => ({
        id: agency.id,
        name: agency.name,
        defaultTenantId: agency.defaultTenantId
          ? {
              id: agency.defaultTenantId.id,
              name: agency.defaultTenantId.name,
              settings: agency.defaultTenantId.settings,
            }
          : null,
      })),
      page: response.data.body.data.page,
      pageSize: response.data.body.data.pageSize,
      count: response.data.body.data.count,
      pageCount: response.data.body.data.pageCount,
      pageNumberIsGood: response.data.body.data.pageNumberIsGood,
      hasPreviousPage: response.data.body.data.hasPreviousPage,
      hasNextPage: response.data.body.data.hasNextPage,
      isFirstPage: response.data.body.data.isFirstPage,
      isLastPage: response.data.body.data.isLastPage,
      numberOfFirstItemOnPage: response.data.body.data.numberOfFirstItemOnPage,
      firstItemOnPage: response.data.body.data.firstItemOnPage,
      numberOfLastItemOnPage: response.data.body.data.numberOfLastItemOnPage,
      lastItemOnPage: response.data.body.data.lastItemOnPage,
    };
  }

  protected buildUrl(attrs: IFindAllAgenciesDao.Input) {
    const url = new URL(this.AGENCIES_ROUTE);

    url.searchParams.set('page', `${attrs.searchParams.page ?? 0}`);
    url.searchParams.set('pagesize', `${attrs.searchParams.pageSize ?? 10}`);
    if (attrs.searchParams.keywords)
      url.searchParams.set('keywords', attrs.searchParams.keywords);
    if (attrs.searchParams.sortBy)
      url.searchParams.set('sortby', attrs.searchParams.sortBy);
    return url.toString();
  }
}
