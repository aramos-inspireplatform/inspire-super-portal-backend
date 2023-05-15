import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CreateTenantAdminUserUseCase } from '~/users/application/use-case/create-tenant-admin-user.use-case';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';
import { CreateTenantAdminUserRequestBodyDto } from '~/users/presentation/dto/input/create-tenant-admin-user-request.dto';
import { PaginatedUsersResponseDto } from '~/users/presentation/dto/output/paginated-users-response.dto';
import { UserResponseDto } from '~/users/presentation/dto/output/user-response.dto';
import { ListAdminUsersUseCase } from '../application/use-case/list-admin-users.use-case';
import { ListUserResponseDto } from '~/users/presentation/dto/output/list-user-response.dto';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { IsMongoIdPipe } from '~/shared/infra/nestjs/pipes/is-mongo-id.pipe';
import { ListOneUserUseCase } from '~/users/application/use-case/list-one-user.use-case';
import { GetAdminUserDetailsDto } from '~/users/presentation/dto/output/admin-user-details.response.dto';

@Controller('users')
@ApiTags('Admin Users')
export class TenantAdminUsersController {
  constructor(
    @Inject(UsersProvidersSymbols.CREATE_TENANT_ADMIN_USER_USE_CASE)
    private readonly createTenantAdminUserUseCase: CreateTenantAdminUserUseCase,
    @Inject(UsersProvidersSymbols.LIST_ADMIN_USERS_USE_CASE)
    private readonly listAdminUsersUseCase: ListAdminUsersUseCase,
    @Inject(UsersProvidersSymbols.LIST_ONE_USER_USE_CASE)
    private readonly listOneUserUseCase: ListOneUserUseCase,
  ) {}

  @Post()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: UserResponseDto })
  async create(
    @Req() request: FastifyRequest,
    @Body() payload: CreateTenantAdminUserRequestBodyDto,
  ) {
    const user = await this.createTenantAdminUserUseCase.create({
      accessToken: request.headers.authorization,
      user: payload,
    });
    return UserResponseDto.factory(UserResponseDto, user);
  }

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: PaginatedUsersResponseDto })
  async list(
    @Req() request: FastifyRequest,
    @Query() pagination: CommonPaginateDto,
  ) {
    const users = await this.listAdminUsersUseCase.list({
      accessToken: request.headers.authorization,
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

  @Get(':id')
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: ListUserResponseDto })
  async findOne(
    @Req() request: FastifyRequest,
    @Param('id', IsMongoIdPipe) userId: string,
  ) {
    const users = await this.listOneUserUseCase.handle({
      accessToken: request.headers.authorization,
      userId,
    });
    return GetAdminUserDetailsDto.factory(GetAdminUserDetailsDto, users);
  }
}
