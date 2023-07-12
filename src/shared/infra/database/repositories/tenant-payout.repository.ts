import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TenantPayoutsEntity } from '~/payouts/domain/entities/tenant-payouts.entity';
import { ITenantPayoutsRepository } from '~/payouts/infra/contracts/repository/tenant-payouts.repository.contract';
import { PaginationInput } from '~/shared/application/services/pagination';
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
    const query = await this.repository
      .createQueryBuilder('tenant_payouts')
      .skip(params.pagination.skip())
      .take(params.pagination.take())
      .getManyAndCount();
    return [
      query[0].map((tenantPayout) => new TenantPayoutsEntity(tenantPayout)),
      query[1],
    ];
  }
}
