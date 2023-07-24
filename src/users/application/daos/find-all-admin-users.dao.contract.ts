import { InspireHttpPaginatedResponse } from '~/shared/types/inspire-http-response.type';
import { QueryPaginatedOutput } from '~/shared/types/query-paginated-output.type';

export interface IFindAllAdminUsersDao {
  execute(params: IFindAllAdminUsersDao.Input): IFindAllAdminUsersDao.Output;
}

export namespace IFindAllAdminUsersDao {
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
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phoneNumber: string;
    phoneNumberCountryId: string;
    isActive: boolean;
    agencyCount: number;
    userType: string;
    createdAt: Date;
    adminBlockedDate: string;
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
    phoneNumberCountryId: string;
    isActive: boolean;
    googleTenantId: string;
    isSsoUser: boolean;
    agencyCount: number;
    userType: string;
    createdAt: Date;
    adminBlockedDate: string;
  };
}
