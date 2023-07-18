export namespace InspireTenantApiServiceAdminUsersDto {
  // FindOne
  export type FindOneInputAttrs = {
    accessToken: string;
    userObjectId: string;
  };
  export type FindOneResult = Promise<AdminUser>;

  // Additional types
  export type AdminUsers = {
    rows: AdminUser[];
    count: number;
    page: number;
    pageSize: number;
    pageCount: number;
    pageNumberIsGood: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    isFirstPage: boolean;
    isLastPage: boolean;
    numberOfFirstItemOnPage: 0;
    firstItemOnPage: number;
    numberOfLastItemOnPage: number;
    lastItemOnPage: number;
  };

  export type AdminUser = {
    id: string;
    objectId: string;
    firstName: string;
    lastName: string;
    email: string;
    agencies: Agency[];
  };

  export type Agency = {
    id: string;
    objectId: string;
    name: string;
  };
}
