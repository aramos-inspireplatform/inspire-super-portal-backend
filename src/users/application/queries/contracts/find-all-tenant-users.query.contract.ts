import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllTenantUsersQuery {
  execute(
    params: IFindAllTenantUsersQuery.Input,
  ): IFindAllTenantUsersQuery.Output;
}

export namespace IFindAllTenantUsersQuery {
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
    adminBlockedDate: string;
    createdAt: Date;
  };
}
