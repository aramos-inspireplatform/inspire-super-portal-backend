import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export interface ILinkTenantUserCommand {
  execute(params: ILinkTenantUserCommand.Input): ILinkTenantUserCommand.Output;
}

export namespace ILinkTenantUserCommand {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    userId: string;
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
  export type ApiResponse = InspireHttpResponse<UserApi>;
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
  };
}
