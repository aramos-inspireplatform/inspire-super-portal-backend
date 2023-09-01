import { Body, Controller, Inject, Post, Req, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { CreateRequestCommand } from '~/requests/application/commands/create-request.command';
import { RequestProviderSymbols } from '~/requests/ioc/requests-providers.symbols';
import { PaymentProviderValidatorRequestDto } from '~/requests/presentation/dtos/modules-requests/requests/modules/payment/payment-validator.dto';
import { GetRequestResponseDto } from '~/requests/presentation/dtos/responses/get-response.dto';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { PaginatedResultsDto } from '~/shared/presentation/paginated-results.dto';
import { CreateRequestBodyDtoV2 } from '~/requests/presentation/v2/inputs/create-request';

@Controller('requests')
@ApiTags('Requests')
@CustomApiExtraModels(
  PaymentProviderValidatorRequestDto,
  PaginatedResultsDto,
  GetRequestResponseDto,
)
export class RequestsControllerV2 {
  constructor(
    @Inject(RequestProviderSymbols.CREATE_REQUEST_COMMAND)
    private readonly createRequestUseCase: CreateRequestCommand,
  ) {}

  @Version('2')
  @Post()
  @AuthenticatedRoute()
  async createV2(
    @Body() payload: CreateRequestBodyDtoV2,
    @Req() req: FastifyRequest,
  ) {
    const request = await this.createRequestUseCase.execute({
      accessToken: req.headers.authorization,
      gTenantId: payload.gTenantId,
      modules: payload.moduleRequests.map((moduleRequest) => {
        return {
          moduleId: moduleRequest.moduleId,
          requestSettings: moduleRequest.settings,
        };
      }),
    });
    return request;
  }
}
