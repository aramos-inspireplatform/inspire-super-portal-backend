export const RequestProviderSymbols = {
  CREATE_REQUEST_USE_CASE: Symbol('CREATE_REQUEST_USE_CASE'),
  LIST_ALL_REQUESTS_USE_CASE: Symbol('LIST_ALL_REQUESTS_USE_CASE'),
  REQUEST_CREATED_EVENT_USE_CASE: Symbol('REQUEST_CREATED_EVENT_USE_CASE'),
  REQUEST_PROVISIONING_WEB_HOOK_USE_CASE: Symbol(
    'REQUEST_PROVISIONING_WEB_HOOK_USE_CASE',
  ),
} as const;
