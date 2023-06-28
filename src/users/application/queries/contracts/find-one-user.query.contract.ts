export interface IFindOneUserQuery {
  execute(params: IFindOneUserQuery.Input): IFindOneUserQuery.Output;
}

export namespace IFindOneUserQuery {
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
