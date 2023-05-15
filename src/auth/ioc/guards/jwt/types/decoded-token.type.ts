export type DecodedToken = {
  claims: Claims;
  iat: number;
  exp: number;
  iss: string;
};

export type Claims = {
  name: string;
  authTime: number;
  email: string;
  userId: string;
  userType: string;
};
