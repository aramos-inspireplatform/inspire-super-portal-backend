import { InspireHttpPaginatedResponse } from '~/shared/types/inspire-http-response.type';
import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllTenantUsersDao {
  execute(params: IFindAllTenantUsersDao.Input): IFindAllTenantUsersDao.Output;
}

export namespace IFindAllTenantUsersDao {
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
  export type User = {
    id: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phoneNumber: string;
    adminBlockedDate: string;
    createdAt: Date;
  };

  // Must be moved to API
  export type ApiResponse = InspireHttpPaginatedResponse<UserApi>;
  type UserApi = {
    id: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phoneNumber: string;
    adminBlockedDate: string;
    googleTenantId: string;
    isSsoUser: boolean;
    createdAt: Date;
  };
}
