import { Module } from '~/requests/domain/entities/module.entity';
import { InspireTenantApiServiceDto } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.dto';

export interface IInspireTenantApiService {
  findAll(
    attrs: InspireTenantApiServiceDto.FindAllInputAttrs,
  ): InspireTenantApiServiceDto.FindAllResult;

  findOne(
    attrs: InspireTenantApiServiceDto.FindOneInputAttrs,
  ): InspireTenantApiServiceDto.FindOneResult;

  // Deprecated below ----------------------------

  getTenantJwtTokenUserDetails(
    attrs: InspireTenantApiServiceDto.GetTenantUserDetailsInputAttrs,
  ): InspireTenantApiServiceDto.UserDetailsResult;

  getTenantDetails(
    attrs: InspireTenantApiServiceDto.GetTenantDetailsInputAttrs,
  ): InspireTenantApiServiceDto.TenantDetailsResult;

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
  }): Promise<InspireTenantApiServiceDto.TenantDetails>;
}
