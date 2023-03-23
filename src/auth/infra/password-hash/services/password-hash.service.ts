import bcrypt from 'bcrypt';

export interface IPasswordHashService {
  compare(args: { plain: string; hash: string }): Promise<boolean>;
  hashPassword(args: { password: string }): Promise<string>;
}

export class PasswordHashService implements IPasswordHashService {
  private readonly SALT_ROUNDS = 12;

  hashPassword(args: { password: string }): Promise<string> {
    return bcrypt.hash(args.password, this.SALT_ROUNDS);
  }

  compare(args: { plain: string; hash: string }): Promise<boolean> {
    return bcrypt.compare(args.plain, args.hash);
  }
}
