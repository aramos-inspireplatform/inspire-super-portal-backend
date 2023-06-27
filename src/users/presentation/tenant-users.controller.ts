import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Req,
  Query,
} from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CreateTenantUserCommand } from '~/users/application/commands/create-tenant-user.command';
import { LinkTenantUserCommand } from '~/users/application/commands/link-tenant-user.command';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';
import { CreateTenantUserRequestDto } from '~/users/presentation/dto/input/create-tenant-user-request.dto';
import { UserResponseDto } from '~/users/presentation/dto/output/user-response.dto';
import { ListTenantUsersUseCase } from '~/users/application/use-case/list-tenant-users.use-case';
import { PaginatedUsersResponseDto } from './dto/output/paginated-users-response.dto';
import { ListUserResponseDto } from '~/users/presentation/dto/output/list-user-response.dto';
import { ListTenantUsersFilterDto } from './dto/input/list-tenant-users-filter.dto';

@Controller('tenants/users')
@ApiTags('Tenant Users')
export class TenantsUsersController {
  constructor(
    @Inject(UsersProvidersSymbols.CREATE_TENANT_USER_COMMAND)
    private readonly createTenantUserUseCase: CreateTenantUserCommand,
    @Inject(UsersProvidersSymbols.LINK_TENANT_USER_COMMAND)
    private readonly linkTenantUser: LinkTenantUserCommand,
    @Inject(UsersProvidersSymbols.LIST_TENANT_USERS_USE_CASE)
    private readonly listTenantUsersUseCase: ListTenantUsersUseCase,
  ) {}

  @Post()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: UserResponseDto })
  async create(
    @Req() request: FastifyRequest,
    @Body() createDto: CreateTenantUserRequestDto,
  ) {
    const tenantUser = await this.createTenantUserUseCase.execute({
      accessToken: request.headers.authorization,
      user: createDto,
      gTenantId: createDto.gTenantId,
    });

    return tenantUser;
  }

  @Post('/:gTenantId/:userId/link-tenant')
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: UserResponseDto })
  async linkTenant(
    @Req() request: FastifyRequest,
    @Param('gTenantId') gTenantId: string,
    @Param('userId') userId: string,
  ) {
    const tenantUser = await this.linkTenantUser.execute({
      accessToken: request.headers.authorization,
      gTenantId: gTenantId,
      userId,
    });

    return tenantUser;
  }

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: UserResponseDto, isArray: true })
  async list(
    @Req() request: FastifyRequest,
    @Query() pagination: ListTenantUsersFilterDto,
  ) {
    const users = await this.listTenantUsersUseCase.list({
      accessToken: request.headers.authorization,
      googleTenantId: pagination.googleTenantId,
      pagination: {
        ...pagination,
        pageSize: pagination.pagesize,
      },
    });
    return new PaginatedUsersResponseDto(
      ListUserResponseDto.factory(ListUserResponseDto, users.rows),
      users.count,
      users.page,
      users.pageSize,
    );
  }
}
