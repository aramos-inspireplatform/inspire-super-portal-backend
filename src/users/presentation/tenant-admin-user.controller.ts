import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';
import { AuthenticatedRoute } from '~/shared/presentation/decorators/authenticated-route.decorator';
import { CreateTenantAdminUserUseCase } from '~/users/application/use-case/create-tenant-admin-user.use-case';
import { UsersProvidersSymbols } from '~/users/ioc/users-providers.symbols';
import { CreateTenantAdminUserRequestBodyDto } from '~/users/presentation/dto/input/create-tenant-admin-user-request.dto';
import { UserResponseDto } from '~/users/presentation/dto/output/user-response.dto';

@Controller('users')
@ApiTags('Admin Users')
export class TenantAdminUsersController {
  constructor(
    @Inject(UsersProvidersSymbols.CREATE_TENANT_ADMIN_USER_USE_CASE)
    private readonly createTenantAdminUserUseCase: CreateTenantAdminUserUseCase,
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
}
