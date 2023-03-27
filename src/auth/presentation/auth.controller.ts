import { Body, Controller, Inject, Ip, Post } from '@nestjs/common';
import {
  ApiDefaultResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SignInUseCase } from '~/auth/application/use-case/sign-in.use-case';
import { InvalidCredentialsException } from '~/auth/domain/exceptions/unauthorized.exception';
import { AuthProvidersSymbols } from '~/auth/ioc/providers/auth-providers.symbols';
import { SignInPayloadRequestBodyDto } from '~/auth/presentation/dto/input/sign-in-payload.dto';
import { SignInResponseBodyDto } from '~/auth/presentation/dto/output/sign-in.dto';
import { UserAgent } from '~/shared/infra/nestjs/decorators/use-agent.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject(AuthProvidersSymbols.SIGN_IN_USE_CASE)
    private readonly signInUseCase: SignInUseCase,
  ) {}

  @Post('sign-in')
  @ApiDefaultResponse({ type: SignInResponseBodyDto })
  @ApiUnauthorizedResponse({ type: InvalidCredentialsException }) // TODO: needs to fix this on the swagger
  async signIn(
    @Body() payload: SignInPayloadRequestBodyDto,
    @Ip() ipAddress: string,
    @UserAgent() userAgent: string,
  ) {
    const signInResult = await this.signInUseCase.signIn({
      ...payload,
      ipAddress,
      userAgent,
    });

    return SignInResponseBodyDto.factory(SignInResponseBodyDto, signInResult);
  }
}
