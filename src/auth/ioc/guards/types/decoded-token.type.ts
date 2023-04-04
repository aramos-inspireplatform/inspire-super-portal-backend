export type DecodedTokenUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type DecodedJwtToken = DecodedTokenUser & {
  sub: string;
  exp: number;
  iat: number;
};
