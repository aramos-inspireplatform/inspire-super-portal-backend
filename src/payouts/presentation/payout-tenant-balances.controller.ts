import { Controller, Get, Inject, Param, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindOneTenantBalanceInputDto } from '~/payouts/presentation/dtos/requests/find-one-tenant-balance.input.dto';
import { FindOneTenantBalanceQuery } from '~/payouts/application/queries/find-one-tenant-balance.query';
import { FindOneTenantBalanceOutput } from '~/payouts/presentation/dtos/responses/find-one-tenanat-balance.output';
import { UserAuth } from '~/auth/presentation/decorators/user-auth.decorator';
import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';
import { FindAllTenantBalancesQuery } from '~/payouts/application/queries/find-all-tenant-balances.query';
import { PaginationInput } from '~/shared/application/services/pagination';
import { FindAllPayoutPaymentsOutputDto } from '~/payouts/presentation/dtos/responses/find-all-payout-payments.output';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';

@Controller('/payouts/tenants')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutTenantBalancesController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_ONE_TENANT_BALANCE_QUERY)
    private readonly findOneTenantBalanceQuery: FindOneTenantBalanceQuery,
    @Inject(PayoutProvidersSymbols.FIND_ALL_TENANT_BALANCES_QUERY)
    private readonly findAllTenantBalancesQuery: FindAllTenantBalancesQuery,
  ) {}

  @Get('/:tenantId')
  @AuthenticatedRoute()
  @ApiParam({
    name: 'tenantId',
    example: 'cd3b78f4-9a07-4eef-914a-60298492fbf1',
    description: 'The tenant unique ID.',
  })
  @ApiOkResponse({ type: FindOneTenantBalanceOutput })
  async findOne(
    @UserAuth() authUser: UserAuthDto,
    @Param('tenantId') tenantId: string,
    @Query() inputDto: FindOneTenantBalanceInputDto,
  ) {
    const tenantBalance = await this.findOneTenantBalanceQuery.execute({
      authUser: authUser,
      tenantId: tenantId,
      settlementCurrencyIsoCode: inputDto.settlementCurrencyIsoCode,
    });

    return tenantBalance;
  }

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllPayoutPaymentsOutputDto }) //TODO: Change this
  async findAll(
    @UserAuth() authUser: UserAuthDto,
    @Query() searchParams: CommonPaginateDto,
  ) {
    const tenantBalances = await this.findAllTenantBalancesQuery.execute({
      authUser,
      paginationInput: new PaginationInput({
        keywords: searchParams.keywords,
        page: searchParams.page,
        size: searchParams.pagesize,
        sort: searchParams.sortby,
      }),
    });

    return tenantBalances;
  }
}
