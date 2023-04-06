import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CreateTenantUseCase } from '~/tenants/application/use-case/create-tenant.use-case';
import { TenantProvidersSymbols } from '~/tenants/ioc/tenants-providers.symbols';
import { CreateTenantRequestBodyDto } from '~/tenants/presentation/dto/input/create-tenant-request.dto';
import { TenantResponseDto } from '~/tenants/presentation/dto/output/tenant-response.dto';

@Controller('tenants')
@ApiTags('Tenants')
export class TenantsController {
  constructor(
    @Inject(TenantProvidersSymbols.CREATE_TENANT_USE_CASE)
    private readonly createTenantUseCase: CreateTenantUseCase,
  ) {}

  @Post()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: TenantResponseDto })
  async createTenant(
    @Body() payload: CreateTenantRequestBodyDto,
    @Req() request: FastifyRequest,
  ) {
    const tenant = await this.createTenantUseCase.create({
      accessToken: request.headers.authorization,
      tenant: payload,
    });

    return TenantResponseDto.factory(TenantResponseDto, tenant);
  }
}
