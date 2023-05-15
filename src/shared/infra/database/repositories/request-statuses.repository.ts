import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RequestStatus } from '~/requests/domain/entities/request-status.entity';
import { IRequestStatusesRepository } from '~/requests/infra/contracts/repository/request-statuses-repository.contract';
import { RequestStatuses } from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';

@Injectable()
export class RequestStatusesRepository implements IRequestStatusesRepository {
  repository: Repository<RequestStatuses>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    dataSource: DataSource,
  ) {
    this.repository =
      dataSource.getRepository<RequestStatuses>(RequestStatuses);
  }

  async findById(
    attrs: IRequestStatusesRepository.FindByIdInputAttrs,
  ): IRequestStatusesRepository.FindByIdResult {
    const requestStatuses = await this.repository
      .createQueryBuilder('requestStatuses')
      .where('requestStatuses.id = :id', { id: attrs.id })
      .getOne();
    return requestStatuses ? new RequestStatus(requestStatuses) : null;
  }
}
