import { Body, Controller, Inject, Ip, Post, Query } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { PasswordResetUseCase } from '~/auth/application/use-case/password-reset.use-case';
import { RequestPasswordResetUseCase } from '~/auth/application/use-case/request-password-reset.use-case';
import { SignInUseCase } from '~/auth/application/use-case/sign-in.use-case';
import { SignOutUseCase } from '~/auth/application/use-case/sign-out.use-case';
import { InvalidCredentialsException } from '~/auth/domain/exceptions/invalid-credentials.exception';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';
import { DecodedTokenUser } from '~/auth/ioc/guards/types/decoded-token.type';
import { ResetPasswordPayloadQueryParamsDto } from '~/auth/presentation/dto/input/reset-password-query-params.dto';
import { ResetPasswordPayloadRequestBodyDto } from '~/auth/presentation/dto/input/reset-password-request.dto';
import { ResetPasswordPayloadBodyDto } from '~/auth/presentation/dto/input/reset-password.dto';
import { SignInPayloadRequestBodyDto } from '~/auth/presentation/dto/input/sign-in-payload.dto';
import { SignInResponseBodyDto } from '~/auth/presentation/dto/output/sign-in.dto';
import { ApiErrorResponse } from '~/shared/infra/nestjs/decorators/api-error-response';
import { UserAgent } from '~/shared/infra/nestjs/decorators/use-agent.decorator';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CurrentUser } from '~/shared/presentation/decorators/current-user.decorator';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject(AuthProvidersSymbols.SIGN_IN_USE_CASE)
    private readonly signInUseCase: SignInUseCase,
    @Inject(AuthProvidersSymbols.REQUEST_PASSWORD_RESET_USE_CASE)
    private readonly requestPasswordResetUseCase: RequestPasswordResetUseCase,
    @Inject(AuthProvidersSymbols.PASSWORD_RESET_USE_CASE)
    private readonly passwordResetUseCase: PasswordResetUseCase,
    @Inject(AuthProvidersSymbols.SIGN_OUT_USE_CASE)
    private readonly signOutUseCase: SignOutUseCase,
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

  @Post('password-reset-request')
  async recoveryPassword(@Body() payload: ResetPasswordPayloadRequestBodyDto) {
    await this.requestPasswordResetUseCase.resetPassword({
      email: payload.email,
    });
  }

  @Post('password-reset')
  async resetPassword(
    @Body() payload: ResetPasswordPayloadBodyDto,
    @Query() queryParams: ResetPasswordPayloadQueryParamsDto,
  ) {
    await this.passwordResetUseCase.resetPassword({
      confirmationPassword: payload.passwordConfirmation,
      password: payload.password,
      securityToken: queryParams.securityToken,
    });
  }

  @Post('sign-out')
  @AuthenticatedRoute()
  async signOut(@CurrentUser() user: DecodedTokenUser) {
    await this.signOutUseCase.signOut({ userId: user.id });
  }
}
