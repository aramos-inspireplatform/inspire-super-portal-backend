import { Controller, Get, Inject, Query, Req } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindAllPayoutPaymentsOutputDto } from '~/payouts/presentation/dtos/responses/find-all-payout-payments.output';
import { FindAllPayoutPaymentsInputDto } from '~/payouts/presentation/dtos/requests/find-all-payout-payments.input.dto';
import { IFindAllTenantPayoutsQuery } from '~/payouts/application/queries/contracts/find-all-tenant-payouts.query.contract';
import { PaginationInput } from '~/shared/application/services/pagination';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { FindAllTenantPayoutsDao } from '~/payouts/infra/daos/find-all-tenant-payouts.dao';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_ALL_TENANT_PAYOUT_QUERY)
    private readonly findAllTenantPayoutsQuery: IFindAllTenantPayoutsQuery,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse()
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
}
