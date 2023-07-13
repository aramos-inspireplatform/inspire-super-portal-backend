import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TenantPayoutsEntity } from '~/payouts/domain/entities/tenant-payouts.entity';
import { ITenantPayoutsRepository } from '~/payouts/infra/contracts/repository/tenant-payouts.repository.contract';
import { TenantPayouts } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

@Injectable()
export class TenantPayoutsRepository implements ITenantPayoutsRepository {
  repository: Repository<TenantPayouts>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository =
      this.dataSource.getRepository<TenantPayouts>(TenantPayouts);
  }

  async findAll(
    params: ITenantPayoutsRepository.Input,
  ): ITenantPayoutsRepository.FindAllResult {
    const query = await this.repository.findAndCount({
      skip: params.pagination.skip(),
      take: params.pagination.take(),
      relations: {
        creatorUsers: true,
        deleterUsers: true,
        payoutStatus: true,
        processorUsers: true,
        settlementCurrency: true,
        tenantsId: true,
        termsRecurringIntervals: true,
        updaterUsers: true,
        tenants: true,
      },
    });
    return [
      query[0].map((tenantPayout) => new TenantPayoutsEntity(tenantPayout)),
      query[1],
    ];
  }
}
