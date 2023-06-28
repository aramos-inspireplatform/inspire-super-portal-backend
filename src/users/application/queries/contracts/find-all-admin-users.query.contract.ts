import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllAdminUsersQuery {
  execute(
    params: IFindAllAdminUsersQuery.Input,
  ): IFindAllAdminUsersQuery.Output;
}

export namespace IFindAllAdminUsersQuery {
  export type Input = {
    accessToken: string;
    gTenantId?: string;
    pagination: {
      page: number;
      pageSize: number;
      sortby?: string;
      keywords?: string;
    };
  };

  export type Output = Promise<QueryPaginatedOutput<User>>;
  type User = {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phoneNumber: string;
    phoneNumberCountryId: string;
    agencyCount: number;
    userType: string;
    createdAt: Date;
    adminBlockedDate: string;
  };
}
