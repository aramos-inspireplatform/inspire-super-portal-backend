import { hash, compare } from 'bcrypt';
import { IPasswordHashService } from '~/auth/infra/contracts/password-hash-service.contract';

export class PasswordHashService implements IPasswordHashService {
  private readonly SALT_ROUNDS = 12;

  hashPassword(args: { password: string }): Promise<string> {
    return hash(args.password, this.SALT_ROUNDS);
  }

  compare(args: { plain: string; hash: string }): Promise<boolean> {
    return compare(args.plain, args.hash);
  }
}
