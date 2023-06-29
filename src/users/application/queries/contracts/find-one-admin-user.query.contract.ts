export interface IFindOneAdminUserQuery {
  execute(params: IFindOneAdminUserQuery.Input): IFindOneAdminUserQuery.Output;
}

export namespace IFindOneAdminUserQuery {
  export type Input = {
    accessToken: string;
    userId: string;
  };

  export type Output = Promise<{
    id: string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    phoneNumber: string;
    userType: UserType;
    phoneNumberCountryId: string;
    agencies: Agency[];
  }>;

  // Additional types
  type UserType = {
    id: string;
    name: string;
    slug: string;
  };

  type Agency = {
    id: string;
    name: string;
    logo: string;
  };
}
