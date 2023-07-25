import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export interface ICreateTenantUserCommand {
  execute(
    params: ICreateTenantUserCommand.Input,
  ): ICreateTenantUserCommand.Output;
}

export namespace ICreateTenantUserCommand {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmationPassword: string;
      title?: string;
      phoneNumber?: string;
      isSsoUser: boolean;
    };
  };

  export type Output = Promise<{
    id: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phoneNumber: string;
    adminBlockedDate: string;
    gTenantId: string;
    isSsoUser: boolean;
  }>;

  // Must be moved to API
  export type ApiResponse = InspireHttpResponse<TenantUserApi>;
  type TenantUserApi = {
    id: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phoneNumber: string;
    adminBlockedDate: string;
    googleTenantId: string;
    isSsoUser: boolean;
  };
}
