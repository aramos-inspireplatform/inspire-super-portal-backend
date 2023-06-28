import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export interface IFindOneAdminUserDao {
  execute(params: IFindOneAdminUserDao.Input): IFindOneAdminUserDao.Output;
}

export namespace IFindOneAdminUserDao {
  export type Input = {
    accessToken: string;
    userId: string;
  };

  export type Output = Promise<{
    id: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phoneNumber: string;
    userType: string;
    phoneNumberCountryId: string;
  }>;

  export type ApiResponse = InspireHttpResponse<UserApi>;
  type UserApi = {
    id: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phoneNumber: string;
    phoneNumberCountryId: string;
    userType: string;
    adminBlockedDate: string;
  };
}
