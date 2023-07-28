import {
  Body,
  Controller,
  Get,
  Post,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserAuth } from '~/auth/presentation/decorators/user-auth.decorator';
import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';
import { ISynchronizeTenantBalanceCommand } from '~/payouts/application/commands/contracts';
import { FindAllTenantBalancesPagedQuery } from '~/payouts/application/queries/find-all-tenant-balances-paged.query';
import { FindOneTenantBalanceQuery } from '~/payouts/application/queries/find-one-tenant-balance.query';
import { PayoutProvidersSymbols } from '~/payouts/ioc/providers/payouts-providers.symbols';
import { FindOneTenantBalanceInputDto } from '~/payouts/presentation/dtos/requests/tenant-balances/find-one-tenant-balance.input.dto';
import { SynchronizeTenantInputDto } from '~/payouts/presentation/dtos/requests/tenant-balances/synchronize-tenant.input.dto';
import {
  FindAllTenantBalancesPagedOutputDto,
  FindOneTenantBalanceOutput,
} from '~/payouts/presentation/dtos/responses/tenant-balances';
import { PaginationInput } from '~/shared/application/services/pagination';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';

@Controller('/payouts/tenants')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutTenantBalancesController {
  constructor(
    @Inject(PayoutProvidersSymbols.Queries.FIND_ALL_TENANT_BALANCES_PAGED)
    private readonly findAllTenantBalancesPagedQuery: FindAllTenantBalancesPagedQuery,
    @Inject(PayoutProvidersSymbols.Queries.FIND_ONE_TENANT_BALANCE)
    private readonly findOneTenantBalanceQuery: FindOneTenantBalanceQuery,
    @Inject(PayoutProvidersSymbols.Commands.SYNCHRONIZE_TENANT_BALANCE)
    private readonly synchronizeTenantBalanceCommand: ISynchronizeTenantBalanceCommand,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllTenantBalancesPagedOutputDto })
  async findAllPaged(
    @UserAuth() userAuth: UserAuthDto,
    @Query() searchParams: CommonPaginateDto,
  ) {
    const tenantBalances = await this.findAllTenantBalancesPagedQuery.execute({
      userAuth: userAuth,
      paginationInput: new PaginationInput({
        keywords: searchParams.keywords,
        page: searchParams.page,
        size: searchParams.pagesize,
        sort: searchParams.sortby,
      }),
    });

    return tenantBalances;
  }

  @Get('/:gTenantId')
  @AuthenticatedRoute()
  @ApiParam({
    name: 'gTenantId',
    example: 'cd3b78f4-9a07-4eef-914a-60298492fbf1',
    description: 'The tenant unique ID.',
  })
  @ApiOkResponse({ type: FindOneTenantBalanceOutput })
  async findOne(
    @UserAuth() userAuth: UserAuthDto,
    @Param('gTenantId') gTenantId: string,
    @Query() inputDto: FindOneTenantBalanceInputDto,
  ) {
    const tenantBalance = await this.findOneTenantBalanceQuery.execute({
      userAuth: userAuth,
      gTenantId: gTenantId,
      settlementCurrencyIsoCode: inputDto.settlementCurrencyIsoCode,
    });

    return tenantBalance;
  }

  @Post('/synchronize')
  @AuthenticatedRoute()
  @ApiParam({
    name: 'gTenantId',
    example: 'cd3b78f4-9a07-4eef-914a-60298492fbf1',
    description: 'The tenant unique ID.',
  })
  @ApiOkResponse()
  async synchronize(
    @UserAuth() userAuth: UserAuthDto,
    @Body() inputDto: SynchronizeTenantInputDto,
  ) {
    await this.synchronizeTenantBalanceCommand.execute({
      tenantId: inputDto.tenantId,
      gTenantId: inputDto.gTenantId,
      name: inputDto.name,
      agency: {
        id: inputDto.agencyId,
        name: inputDto.agencyName,
      },
      status: {
        id: inputDto.tenantStatusId,
      },
      terms: {
        recurringIntervalCount: inputDto.termsRecurringIntervalCount,
        recurringIntervalId: inputDto.termsRecurringIntervalId,
      },
      balances: inputDto.balances
        ? inputDto.balances.map((balance) => ({
            settlementCurrencyId: balance.settlementCurrencyId,
            amount: balance.amount,
          }))
        : null,
    });
  }
}
