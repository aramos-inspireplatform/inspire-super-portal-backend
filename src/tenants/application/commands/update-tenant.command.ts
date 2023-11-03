import { HttpStatus } from '@nestjs/common';
import { ITenantRepository } from '~/payouts/domain/repositories';
import { IInspirePaymentApiService } from '~/shared/application/services/inspire-api-services/payment/services/contracts/inspire-payment-api-service.contract';
import { UpdateProductPriceDto } from '~/shared/application/services/inspire-api-services/payment/services/contracts/product-prices/update-product-prices.dto';
import { IInspireTenantApiService } from '~/shared/application/services/inspire-api-services/tenant/services/contracts/inspire-tenant-api-service.contract';
import { IUpdateTenantCommand } from '~/tenants/application/commands/contracts';

export class UpdateTenantCommand implements IUpdateTenantCommand {
  constructor(
    private readonly inspireTenantService: IInspireTenantApiService,
    private readonly inspireBillingService: IInspirePaymentApiService,
  ) {}

  async execute(
    attrs: IUpdateTenantCommand.Input,
  ): IUpdateTenantCommand.Output {
    let updateDualPrice: boolean = false;
    let response: IUpdateTenantCommand.Response;

    const tenant = await this.inspireTenantService.findOneTenant({
      accessToken: attrs.accessToken,
      gTenantId: attrs.tenantId,
    });

    if (tenant instanceof Error) throw tenant;

    if (tenant) {
      const tenantUpdate: IUpdateTenantCommand.UpdateTenantBodyAttr = {
        name: tenant?.name,
        accountName: tenant?.accountName,
        slug: tenant?.slug,
        countryId: tenant?.country.id,
        timezoneId: tenant?.timezone.id,
        languageId: tenant?.language.id,
        termsRecurringIntervalCount: tenant?.termsRecurringIntervalCount,
        termsRecurringIntervalId: tenant?.termsRecurringInterval?.id,
        isDualPricingActive:
          attrs?.body?.isDualPricingActive !== undefined
            ? attrs?.body?.isDualPricingActive
            : tenant?.isDualPricingActive,
        dualPricingPercentage:
          attrs?.body?.dualPricingPercentage !== undefined
            ? attrs?.body?.dualPricingPercentage / 100
            : tenant?.dualPricingPercentage,
      };

      if (attrs?.body?.isDualPricingActive === true) {
        if (
          attrs?.body?.dualPricingPercentage === undefined &&
          tenant?.dualPricingPercentage === undefined
        ) {
          throw new Error(
            'Dual pricing percentage is required when dual pricing is active',
          );
        }

        if (
          attrs?.body?.dualPricingPercentage !== tenant?.dualPricingPercentage
        ) {
          updateDualPrice = true;
        }
      }

      const res = await this.inspireTenantService.updateTenant({
        accessToken: attrs.accessToken,
        id: tenant?.id,
        tenant: tenant?.googleTenantId,
        body: {
          ...tenantUpdate,
        },
      });
      if (res instanceof Error) throw res;

      if (updateDualPrice === true) {
        const resBilling: UpdateProductPriceDto.Response =
          await this.inspireBillingService.updateProductPrice({
            accessToken: attrs.accessToken,
            tenant: tenant?.googleTenantId,
            percentage: attrs?.body?.dualPricingPercentage,
          });

        if (resBilling instanceof Error) throw resBilling;
        response = {
          code: HttpStatus.OK,
          message: 'Update successful',
          updatedProductPrices: resBilling?.numberOfProductPricesUpdated,
          updatedTenant: res,
        };

        return response;
      } else {
        response = {
          code: HttpStatus.OK,
          message: 'Update successful',
          updatedTenant: res,
        };
        return response;
      }
    }
  }
}
