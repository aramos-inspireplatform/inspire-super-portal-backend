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
    userType: string;
    phoneNumberCountryId: string;
  }>;
}
