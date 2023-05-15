import { Controller, Get, Inject, Req } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { ListTimeZonesUseCase } from '~/time-zones/application/use-case/list-time-zones.use-case';
import { TimeZonesProvidersSymbols } from '~/time-zones/ioc/time-zones-providers.symbols';
import { GetTimezoneDto } from '~/time-zones/presentation/dto/output/get-time-zone.dto';

@Controller('time-zones')
@ApiTags('Time Zones')
export class TimeZonesController {
  constructor(
    @Inject(TimeZonesProvidersSymbols.LIST_TIME_ZONES_USE_CASE)
    private readonly listTimeZonesUseCase: ListTimeZonesUseCase,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: GetTimezoneDto, isArray: true })
  async list(@Req() request: FastifyRequest) {
    const timeZones = this.listTimeZonesUseCase.list({
      accessToken: request.headers.authorization,
    });
    return GetTimezoneDto.factory(GetTimezoneDto, timeZones);
  }
}
