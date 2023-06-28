import { InspireHttpResponse } from '~/shared/types/inspire-http-response.type';

export interface ICreateRequestCommand {
  execute(params: ICreateRequestCommand.Input): ICreateRequestCommand.Output;
}

export namespace ICreateRequestCommand {
  export type Input = {
    accessToken: string;
    gTenantId: string;
    modules: RequestModule[];
  };

  export type Output = Promise<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    gTenantId: string;
  }>;

  // Additional types
  type RequestModule = {
    moduleId: string;
    requestSettings: object;
  };

  // Must be moved to API
  export type ApiResponse = InspireHttpResponse<RequestApi>;
  type RequestApi = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    googleTenantId: string;
  };
}
