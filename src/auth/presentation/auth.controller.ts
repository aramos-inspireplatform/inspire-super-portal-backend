import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInUseCase } from '~/auth/application/use-case/sign-in.use-case';
import { AuthProvidersSymbols } from '~/auth/ioc/providers/auth-providers.symbols';
import { SignInPayloadRequestBodyDto } from '~/auth/presentation/dto/input/sign-in-payload.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject(AuthProvidersSymbols.SIGN_IN_USE_CASE)
    private readonly signInUseCase: SignInUseCase,
  ) {}

  @Post()
  async signIn(@Body() payload: SignInPayloadRequestBodyDto) {
    const signInResult = await this.signInUseCase.signIn(payload);

    return signInResult;
  }
}
