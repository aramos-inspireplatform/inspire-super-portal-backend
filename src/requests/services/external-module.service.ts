export interface IExternalModulesService {
  callDeployModule(url: string, payload: any): Promise<any>;
  verifyModuleStatus(
    url: string,
    tenant: string,
  ): Promise<IExternalModulesService.ModuleStatus>;
}

export namespace IExternalModulesService {
  export type ModuleStatus = {
    status: 'success';
    tenant:
      | {
          id: string;
          name: string;
          tenantId: string;
          createdDate: Date;
        }
      | {
          status: 'failed';
          tenant: {
            id: string;
            name: string;
            tenantId: string;
            createdDate: Date;
          };
        };
  };

  // export type DeployModuleResponse = {
  //   status: 'success',
  //   data:
}
