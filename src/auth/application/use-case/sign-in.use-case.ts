import { AuthSignInService } from '~/auth/application/service/sign-in.service';
import { IFindUserByEmail } from '~/users/application/services/contracts/find-user-by-email.contract';

export class SignInUseCase {
  constructor(
    private readonly findUser: IFindUserByEmail,
    private readonly authSignInService: AuthSignInService,
  ) {}

  async signIn(attrs: { email: string; password: string }) {
    const user = await this.findUser.findByEmail({
      email: attrs.email,
    });
    return this.authSignInService.signIn({
      password: attrs.password,
      user,
    });
  }
}
