export namespace TenantStatusesEnum {
  export enum Ids {
    PENDING = '8e119286-dd47-4430-aec1-77fe50c6766b',
    ACTIVE = 'a217e218-a723-4659-8f3d-9f218310655b',
    INACTIVE = '5a8f1c1e-1252-4cfe-9f80-24a0a99f7350',
  }

  export enum Slugs {
    PENDING = 'pending',
    ACTIVE = 'active',
    INACTIVE = 'inactive',
  }

  export enum Exceptions {
    NOT_FOUND = 'exception:TENANT_STATUS_NOT_FOUND',
  }
}
