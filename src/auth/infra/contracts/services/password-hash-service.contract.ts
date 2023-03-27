export interface IPasswordHashService {
  compare(args: { plain: string; hash: string }): Promise<boolean>;
  hashPassword(args: { password: string }): Promise<string>;
}
