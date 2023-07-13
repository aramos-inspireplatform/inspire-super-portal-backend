import { Module } from '~/requests/domain/entities/module.entity';
import { InspireTenantApiServiceAdminUsersDto } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.admin-users.dto';
import { InspireTenantApiServiceTenantsDto } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.tenants.dto';

export interface IInspireTenantApiService {
  // Tenants
  findAllTenants(
    attrs: InspireTenantApiServiceTenantsDto.FindAllTenantsInputAttrs,
  ): InspireTenantApiServiceTenantsDto.FindAllTenantsResult;

  findOneTenant(
    attrs: InspireTenantApiServiceTenantsDto.FindOneTenantInputAttrs,
  ): InspireTenantApiServiceTenantsDto.FindOneTenantResult;

  createTenant(
    attrs: InspireTenantApiServiceTenantsDto.CreateTenantInputAttrs,
  ): InspireTenantApiServiceTenantsDto.CreateTenantResult;

  // Admin Users
  findOneAdminUser(
    attrs: InspireTenantApiServiceAdminUsersDto.FindOneInputAttrs,
  ): InspireTenantApiServiceAdminUsersDto.FindOneResult;

  // Deprecated below ----------------------------

  getTenantJwtTokenUserDetails(
    attrs: InspireTenantApiServiceTenantsDto.GetTenantUserDetailsInputAttrs,
  ): InspireTenantApiServiceTenantsDto.UserDetailsResult;

  getTenantDetails(
    attrs: InspireTenantApiServiceTenantsDto.GetTenantDetailsInputAttrs,
  ): InspireTenantApiServiceTenantsDto.TenantDetailsResult;

  linkTenantModule(attrs: {
    module: Module;
    attrs: {
      tenantIntegrationKey: string;
      moduleUrl: string;
    };
    tenant: {
      id: string;
      googleTenantId: string;
      name: string;
      slug: string;
    };
  }): Promise<void>;

  getTenantAndUserDetails(attrs: {
    tenantIntegrationKey: string;
    googleTenantId: string;
  }): Promise<InspireTenantApiServiceTenantsDto.TenantDetails>;
}
