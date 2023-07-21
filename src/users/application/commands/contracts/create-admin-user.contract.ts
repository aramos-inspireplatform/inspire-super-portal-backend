import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export interface ICreateAdminUserCommand {
  execute(
    params: ICreateAdminUserCommand.Input,
  ): ICreateAdminUserCommand.Output;
}

export namespace ICreateAdminUserCommand {
  export type Input = {
    accessToken: string;
    user: {
      firstName: string;
      lastName: string;
      userTypeId: string;
      email: string;
      title?: string;
      phoneNumber?: string;
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
