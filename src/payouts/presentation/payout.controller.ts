import {
  Controller,
  Get,
  Post,
  Inject,
  Query,
  Req,
  Body,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PayoutProvidersSymbols } from '~/payouts/ioc/payouts-providers.symbols';
import { FindAllPayoutPaymentsOutputDto } from '~/payouts/presentation/dtos/responses/find-all-payout-payments.output';
import { IFindAllTenantPayoutsQuery } from '~/payouts/application/queries/contracts/find-all-tenant-payouts.query.contract';
import { PaginationInput } from '~/shared/application/services/pagination';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { FindOnePayoutSummaryPreviewInputDto } from '~/payouts/presentation/dtos/requests/find-one-payout-summary-preview.input.dto';
import { PreviewPayoutSummaryOutputDto } from '~/payouts/presentation/dtos/responses/preview-payout-summary.output';
import { FindOnePayoutSummaryPreviewQuery } from '~/payouts/application/queries/find-one-payout-summary-preview.query';

@Controller('/payouts')
@ApiTags('Payouts')
@CustomApiExtraModels()
export class PayoutController {
  constructor(
    @Inject(PayoutProvidersSymbols.FIND_ALL_TENANT_PAYOUT_QUERY)
    private readonly findAllTenantPayoutsQuery: IFindAllTenantPayoutsQuery,
    @Inject(PayoutProvidersSymbols.FIND_ONE_PAYOUT_SUMMARY_PREVIEW_QUERY)
    private readonly findOnePayoutSummaryPreviewQuery: FindOnePayoutSummaryPreviewQuery,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiOkResponse({ type: FindAllPayoutPaymentsOutputDto })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() searchParams: CommonPaginateDto,
  ) {
    const payouts = await this.findAllTenantPayoutsQuery.execute({
      pagination: new PaginationInput({
        keywords: searchParams.keywords,
        page: searchParams.page,
        size: searchParams.pagesize,
        sort: searchParams.sortby,
      }),
    });

    return payouts;
  }

  @Post('/summary/preview')
  @AuthenticatedRoute()
  @ApiOkResponse({ type: PreviewPayoutSummaryOutputDto })
  async findOneSummaryPreview(
    @Req() request: FastifyRequest,
    @Body() inputDto: FindOnePayoutSummaryPreviewInputDto,
  ) {
    const payoutSummaryPreview =
      await this.findOnePayoutSummaryPreviewQuery.execute({
        accessToken: request.headers.authorization,
        gTenantId: inputDto.gTenantId,
        payments: inputDto.payments,
        adjustmentFees: inputDto.adjustmentFees,
      });

    return payoutSummaryPreview;
  }
}
