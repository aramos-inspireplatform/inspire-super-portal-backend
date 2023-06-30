import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllTenantsDao {
  execute(params: IFindAllTenantsDao.Input): IFindAllTenantsDao.Output;
}

export namespace IFindAllTenantsDao {
  export type Input = {
    accessToken: string;
    pagination: {
      page: number;
      pageSize: number;
      sortby?: string;
      keywords?: string;
    };
  };

  export type Output = QueryPaginatedOutput<Tenant>;

  // Additional types
  export type Tenant = {
    id: string;
    name: string;
    slug: string;
    gTenantId: string;
    logo: string;
    accountName: string;
    publicBusinessName: string;
    supportEmail: string;
    supportPhoneNumber: string;
    showPhoneOnInvoiceAndReceipt: boolean;
    statementDescriptor: string;
    shortenedDescriptor: string;
    businessWebsite: string;
    supportWebsite: string;
    privacyPolicy: string;
    termsOfService: string;
    createdAt: Date;
    agency: Agency;
    timezone: Timezone;
    language: Language;
    currencies: Currency[];
    country: Country;
    status: Status;
    settings: Settings;
  };

  type Agency = {
    id: string;
    name: string;
    logo: string;
  };

  type Timezone = {
    id: string;
    name: string;
    countryIsoCode: string;
    utcOffset: string;
    utcDstOffset: string;
  };

  type Language = {
    id: string;
    name: string;
    isoCode: string;
  };

  type Currency = {
    id: string;
    name: string;
    symbol: string;
    isoCode: string;
    isDefault: boolean;
    isActive: boolean;
  };

  type Country = {
    id: string;
    name: string;
    code: string;
    flagSvgUrl: string;
  };

  type Status = {
    id: string;
    name: string;
    slug: string;
  };

  type Settings = { [property: string]: any };
}
