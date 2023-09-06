import { Controller, Get, Inject, Param, Req } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { GetTermsRecurringIntervalUseCase } from '~/terms-recurring-interval/application/use-case/get-terms-recurring-interval.use-case';
import { ListTermsRecurringIntervalUseCase } from '~/terms-recurring-interval/application/use-case/list-terms-recurring-interval.use-case';
import { TermsRecurringIntervalProvidersSymbols } from '~/terms-recurring-interval/ioc/terms-recurring-interval.symbols';
import { GetTermsRecurringIntervalDto } from '~/terms-recurring-interval/presentation/dto/output/get-terms-recurring-interval.dto';

@Controller('terms-recurring-interval')
@ApiTags('Terms Recurring Interval')
export class TermsRecurringIntervalController {
  constructor(
    @Inject(
      TermsRecurringIntervalProvidersSymbols.LIST_RECURRING_INTERVAL_USE_CASE,
    )
    private readonly listTermsRecurringIntervalUseCase: ListTermsRecurringIntervalUseCase,
    @Inject(
      TermsRecurringIntervalProvidersSymbols.GET_RECURRING_INTERVAL_USE_CASE,
    )
    private readonly getTermsRecurringIntervalUseCase: GetTermsRecurringIntervalUseCase,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: GetTermsRecurringIntervalDto, isArray: true })
  async list(@Req() request: FastifyRequest) {
    const termsRecurringInterval =
      await this.listTermsRecurringIntervalUseCase.list({
        accessToken: request.headers.authorization,
      });
    return GetTermsRecurringIntervalDto.factory(
      GetTermsRecurringIntervalDto,
      termsRecurringInterval,
    );
  }

  @Get(':uuid')
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: GetTermsRecurringIntervalDto, isArray: false })
  async get(@Req() request: FastifyRequest, @Param('uuid') uuid: string) {
    const termsRecurringInterval = this.getTermsRecurringIntervalUseCase.get({
      accessToken: request.headers.authorization,
      uuid,
    });
    return GetTermsRecurringIntervalDto.factory(
      GetTermsRecurringIntervalDto,
      termsRecurringInterval,
    );
  }
}
