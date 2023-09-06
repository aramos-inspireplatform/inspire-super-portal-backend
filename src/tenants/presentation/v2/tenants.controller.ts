import { Body, Controller, Inject, Post, Req, Version } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CustomApiExtraModels } from '~/shared/presentation/decorators/has-paginated-result.decorator';
import { TenantProviders } from '~/tenants/ioc/tenants-providers.symbols';
import {
  GetUserFromRequest,
  UserFromRequest,
} from '~/shared/presentation/decorators/get-user-from-request';
import { CreateTenantRequestBodyDto } from '~/tenants/presentation/v2/dtos/requests';
import { CreateTenantOutput } from '~/tenants/presentation/v2/dtos/responses';
import { CreateTenantCommand } from '~/tenants/application/commands';

@ApiTags('Tenants')
@CustomApiExtraModels()
@Controller({ version: '2', path: 'tenants' })
export class TenantsControllerV2 {
  constructor(
    @Inject(TenantProviders.Commands.CREATE_TENANT_COMMAND)
    private readonly createTenantCommand: CreateTenantCommand,
  ) {}

  @Post()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: CreateTenantOutput })
  async create(
    @Body() createDto: CreateTenantRequestBodyDto,
    @Req() request: FastifyRequest,
    @GetUserFromRequest() user: UserFromRequest,
  ) {
    return this.createTenantCommand.execute({
      accessToken: request.headers.authorization,
      tenant: {
        name: createDto.name,
        accountName: createDto.accountName,
        slug: createDto.slug,
        countryId: createDto.countryId,
        settings: createDto.settings,
        agencyId: createDto.agencyId,
        timezoneId: createDto.timezoneId,
        languageId: createDto.languageId,
        termsRecurringIntervalCount: createDto.termsRecurringIntervalCount,
        termsRecurringIntervalId: createDto.termsRecurringIntervalId,
      },
      currentUserId: user.claims.userId,
      currentUserEmail: user.claims.email,
    });
  }
}
