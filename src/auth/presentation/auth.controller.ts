import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { ForgotPasswordResetUseCase } from '~/auth/application/use-case/forgot-password.use-case';
import { RefreshTokenUseCase } from '~/auth/application/use-case/refresh-token.use-case';
import { SignInUseCase } from '~/auth/application/use-case/sign-in.use-case';
import { SignOutUseCase } from '~/auth/application/use-case/sign-out.use-case';
import { InvalidCredentialsException } from '~/auth/domain/exceptions/invalid-credentials.exception';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';
import { ForgotPasswordPayloadRequestBodyDto } from '~/auth/presentation/dto/input/forgot-password-request.dto';
import { RefreshTokenPayloadRequestBodyDto } from '~/auth/presentation/dto/input/refresh-token-request.dto';
import { SignInPayloadRequestBodyDto } from '~/auth/presentation/dto/input/sign-in-payload.dto';
import { SignInResponseBodyDto } from '~/auth/presentation/dto/output/sign-in.dto';
import { ApiErrorResponse } from '~/shared/infra/nestjs/decorators/api-error-response';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject(AuthProvidersSymbols.SIGN_IN_USE_CASE)
    private readonly signInUseCase: SignInUseCase,
    @Inject(AuthProvidersSymbols.FORGOT_PASSWORD_USE_CASE)
    private readonly forgotPasswordUseCase: ForgotPasswordResetUseCase,
    @Inject(AuthProvidersSymbols.SIGN_OUT_USE_CASE)
    private readonly signOutUseCase: SignOutUseCase,
    @Inject(AuthProvidersSymbols.REFRESH_TOKEN_USE_CASE)
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) {}

  @Post('sign-in')
  @ApiDefaultResponse({ type: SignInResponseBodyDto })
  @ApiErrorResponse({
    message: InvalidCredentialsException.MESSAGE,
    status: InvalidCredentialsException.STATUS_CODE,
    error: InvalidCredentialsException.ERROR,
  })
  async signIn(@Body() payload: SignInPayloadRequestBodyDto) {
    const signInResult = await this.signInUseCase.signIn(payload);

    return SignInResponseBodyDto.factory(SignInResponseBodyDto, signInResult);
  }

  @Post('forgot-password')
  async recoveryPassword(@Body() payload: ForgotPasswordPayloadRequestBodyDto) {
    await this.forgotPasswordUseCase.resetPassword(payload);
  }

  @Post('sign-out')
  @AuthenticatedRoute()
  async signOut(@Req() request: FastifyRequest) {
    await this.signOutUseCase.signOut({
      refreshToken: request.headers.authorization,
    });
  }

  @Post('refresh-token')
  async refreshToken(@Body() payload: RefreshTokenPayloadRequestBodyDto) {
    const signInResult = await this.refreshTokenUseCase.refreshToken(payload);
    return SignInResponseBodyDto.factory(SignInResponseBodyDto, signInResult);
  }
}
