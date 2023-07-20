import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllTenantsQuery {
  execute(params: IFindAllTenantsQuery.Input): IFindAllTenantsQuery.Output;
}

export namespace IFindAllTenantsQuery {
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
    createdAt: Date;
    agency: Agency;
    timezone: Timezone;
    language: Language;
    country: Country;
    status: Status;
    termsRecurringIntervalCount: number;
    termsRecurringInterval: TermsRecurringInterval;
  };

  // Additional types
  type Agency = {
    id: string;
    name: string;
    logo: string;
  };

  type Timezone = {
    id: string;
    name: string;
    countryIsoCode: string;
  };

  type Language = {
    id: string;
    name: string;
    isoCode: string;
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

  type TermsRecurringInterval = {
    uuid: string;
    name: string;
    interval: string;
    isActive: boolean;
  };
}
