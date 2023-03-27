import { Body, Controller, Inject, Ip, Post } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { SignInUseCase } from '~/auth/application/use-case/sign-in.use-case';
import { InvalidCredentialsException } from '~/auth/domain/exceptions/unauthorized.exception';
import { AuthProvidersSymbols } from '~/auth/ioc/providers/auth-providers.symbols';
import { SignInPayloadRequestBodyDto } from '~/auth/presentation/dto/input/sign-in-payload.dto';
import { SignInResponseBodyDto } from '~/auth/presentation/dto/output/sign-in.dto';
import { ApiErrorResponse } from '~/shared/infra/nestjs/decorators/api-error-response';
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
  @ApiErrorResponse({
    message: InvalidCredentialsException.MESSAGE,
    status: InvalidCredentialsException.STATUS_CODE,
    error: InvalidCredentialsException.ERROR,
  })
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
