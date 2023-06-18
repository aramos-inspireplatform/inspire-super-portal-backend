export const TenantProvidersSymbols = {
  FIND_ALL_TENANT_V2_USE_CASE: Symbol('FIND_ALL_TENANT_V2_USE_CASE'),
  FIND_TENANT_V2_USE_CASE: Symbol('FIND_TENANT_V2_USE_CASE'),
  CREATE_TENANT_USE_CASE: Symbol('CREATE_TENANT_USE_CASE'),

  // Deprecated below ----------------------------

  LIST_TENANTS_USE_CASE: Symbol('LIST_TENANTS_USE_CASE'),
  FIND_TENANT_USE_CASE: Symbol('FIND_TENANT_USE_CASE'),
} as const;
