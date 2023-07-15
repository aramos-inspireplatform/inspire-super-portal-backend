import { Controller, Get, Inject, Param, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { UserAuth } from '~/auth/presentation/decorators/user-auth.decorator';
import { UserAuthDto } from '~/auth/presentation/dto/input/user-auth.dto';
import { IFindAllTenantPayoutsQuery } from '~/payouts/application/queries/contracts/find-all-tenant-payouts.query.contract';
import { IFindOnePaymentsPayoutQuery } from '~/payouts/application/queries/contracts/find-one-payments-payout.query.contract';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindAllPayoutPaymentsOutputDto } from '~/payouts/presentation/dtos/responses/find-all-payout-payments.output';
import { FindOnePaymentsPayoutOutput } from '~/payouts/presentation/dtos/responses/find-one-payments-payout.output';
import { PaginationInput } from '~/shared/application/services/pagination';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_ALL_TENANT_PAYOUT_QUERY)
    private readonly findAllTenantPayoutsQuery: IFindAllTenantPayoutsQuery,

    @Inject(PayoutProvidersSymbols.FIND_ONE_PAYMENTS_PAYOUT_QUERY)
    private readonly findOnePaymentsPayoutQuery: IFindOnePaymentsPayoutQuery,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllPayoutPaymentsOutputDto })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() searchParams: CommonPaginateDto,
  ) {
    const payments = await this.findAllTenantPayoutsQuery.execute({
      pagination: new PaginationInput({
        keywords: searchParams.keywords,
        page: searchParams.page,
        size: searchParams.pagesize,
        sort: searchParams.sortby,
      }),
    });

    return payments;
  }

  @Get('/:payoutId')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindOnePaymentsPayoutOutput })
  async findOne(
    @UserAuth() authUser: UserAuthDto,
    @Param('payoutId') payoutId: string,
  ) {
    const tenantBalance = await this.findOnePaymentsPayoutQuery.execute({
      authUser: authUser,
      payoutId: payoutId,
    });

    return tenantBalance;
  }
}
