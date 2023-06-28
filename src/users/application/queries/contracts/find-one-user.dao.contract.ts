import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export interface IFindOneUserDao {
  execute(params: IFindOneUserDao.Input): IFindOneUserDao.Output;
}

export namespace IFindOneUserDao {
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
