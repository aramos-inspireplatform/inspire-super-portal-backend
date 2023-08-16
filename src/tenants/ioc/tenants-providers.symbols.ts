export namespace TenantProviders {
  export enum Commands {
    CREATE_TENANT_COMMAND = 'CREATE_TENANT_COMMAND',
  }
}
export const TenantProvidersSymbols = {
  FIND_ALL_TENANTS_QUERY: Symbol('FIND_ALL_TENANT_QUERY'),
  FIND_ALL_TENANTS_DAO: Symbol('FIND_ALL_TENANTS_DAO'),
  FIND_ONE_TENANT_QUERY: Symbol('FIND_ONE_TENANT_QUERY'),
  FIND_ONE_TENANT_DAO: Symbol('FIND_ONE_TENANT_DAO'),
} as const;
