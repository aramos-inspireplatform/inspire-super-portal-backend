import { Inject, Injectable } from '@nestjs/common';
import { Datasource, Repository } from 'typeorm';
import { Requests } from '~/shared/infra/database/entities';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import {DatabaseProvidersSymbols} from '~/shared/infra/database/ioc/providers/provider.symbols'

@Injectable()
export class RequestRepository implements IRequestRepository {
  repository: Repository<Requests>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource
  )
}
