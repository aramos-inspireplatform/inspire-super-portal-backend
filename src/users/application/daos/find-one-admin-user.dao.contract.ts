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
    isActive: boolean;
    userTypeId: UserType;
    phoneNumberCountryId: string;
    agencies: Agency[];
    adminBlockedDate: string;
  }>;

  // Additional types
  type UserType = {
    id: string;
    name: string;
    slug: string;
  };

  type Agency = {
    id: string;
    name: string;
    logo: string;
  };

  //TODO: move to the tenant api service
  export type ApiResponse = InspireHttpResponse<UserApi>;
  type UserApi = {
    id: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    isActive: boolean;
    phoneNumber: string;
    phoneNumberCountryId: string;
    userTypeId: {
      id: string;
      name: string;
      slug: string;
    };
    agencies: {
      id: string;
      name: string;
      logo: string;
    }[];
    adminBlockedDate: string;
  };
}
