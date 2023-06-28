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
import { FindAllAdminUsersQuery } from '../application/queries/find-all-admin-users.query';
import { ListUserResponseDto } from '~/users/presentation/dto/output/list-user-response.dto';
import { CommonPaginateDto } from '~/shared/presentation/common-paginated.dto';
import { IsMongoIdPipe } from '~/shared/infra/nestjs/pipes/is-mongo-id.pipe';
import { FindOneUserQuery } from '~/users/application/queries/find-one-user.query';
import { GetAdminUserDetailsDto } from '~/users/presentation/dto/output/admin-user-details.response.dto';

@Controller('users')
@ApiTags('Admin Users')
export class TenantAdminUsersController {
  constructor(
    @Inject(UsersProvidersSymbols.FIND_ALL_ADMIN_USERS_QUERY)
    private readonly findAllAdminUsersQuery: FindAllAdminUsersQuery,
    @Inject(UsersProvidersSymbols.FIND_ONE_USER_QUERY)
    private readonly findOneUserQuery: FindOneUserQuery,
    @Inject(UsersProvidersSymbols.CREATE_TENANT_ADMIN_USER_USE_CASE)
    private readonly createTenantAdminUserUseCase: CreateTenantAdminUserUseCase,
  ) {}

  @Get()
  @AuthenticatedRoute()
  @ApiDefaultResponse({ type: PaginatedUsersResponseDto })
  async findAll(
    @Req() request: FastifyRequest,
    @Query() pagination: CommonPaginateDto,
  ) {
    const users = await this.findAllAdminUsersQuery.execute({
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
    const user = await this.findOneUserQuery.execute({
      accessToken: request.headers.authorization,
      userId,
    });

    return user;
  }

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
}
