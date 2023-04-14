import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { DataSource, Repository } from 'typeorm';
import { ModuleRequestStatusesConstant } from '~/requests/domain/constants/module-request-statuses.constant';
import { Module } from '~/requests/domain/entities/module.entity';
import { RequestModule } from '~/requests/domain/entities/request-module.entity';
import { RequestStatus } from '~/requests/domain/entities/request-status.entity';
import { Request } from '~/requests/domain/entities/request.entity';
import { IRequestRepository } from '~/requests/infra/contracts/repository/request-repository.contract';
import {
  RequestModules as RequestModulesMapper,
  Requests,
} from '~/shared/infra/database/entities';
import { DatabaseProvidersSymbols } from '~/shared/infra/database/ioc/providers/provider.symbols';
import { Tenant } from '~/tenants/domain/entity/tenant.entity';

@Injectable()
export class RequestRepository implements IRequestRepository {
  repository: Repository<Requests>;

  constructor(
    @Inject(DatabaseProvidersSymbols.DATA_SOURCE)
    private readonly dataSource: DataSource,
  ) {
    this.repository = dataSource.getRepository<Requests>(Requests);
  }

  async listAndCount(
    attrs: IRequestRepository.ListInputAttrs,
  ): IRequestRepository.ListResult {
    const [requests, count] = await this.repository.findAndCount({
      skip: attrs.skip,
      take: attrs.take,
      relations: [
        'requestStatus',
        'tenant',
        'requestModules',
        'requestModules.request',
        'requestModules.moduleRequestType',
      ],
    });

    return [
      requests.map(
        (request) =>
          new Request({
            ...request,
            tenant: new Tenant(request.tenant),
            requestStatus: new RequestStatus(request.requestStatus),
            requestModules: request.requestModules.map(
              (rm) =>
                new RequestModule({
                  module: new Module(rm.moduleRequestType),
                  settings: rm.requestSettings,
                  request: new Request({
                    ...rm.request,
                    requestModules: [],
                  }),
                }),
            ),
          }),
      ),
      count,
    ];
  }

  async save(
    attrs: IRequestRepository.SaveInputAttrs,
  ): IRequestRepository.SaveResult {
    const entity = await this.repository
      .create({
        ...attrs.request,
        requestStatus: <any>attrs.request.requestStatus.id,
        requestModules: attrs.request.requestModules.map(
          (rm) =>
            <RequestModulesMapper>{
              id: randomUUID(),
              request: <any>attrs.request.id,
              moduleRequestType: <any>rm.module.id,
              moduleRequestStatus: <any>ModuleRequestStatusesConstant.Requested,
              requestSettings: rm.settings,
              attempts: 0,
            },
        ),
      })
      .save();

    const request = await this.findOne({ id: entity.id });

    Object.assign(
      attrs.request,
      new Request({
        ...request,
        tenant: new Tenant(request.tenant),
        requestModules: request.requestModules.map(
          (rm) =>
            new RequestModule({
              ...rm,
              module: new Module(rm.moduleRequestType),
              settings: rm.requestSettings,
              request: new Request({
                ...rm.request,
                requestModules: [],
              }),
            }),
        ),
      }),
    );
    return attrs.request;
  }

  async updateStatus({ id, statusId }: { id: string; statusId: string }) {
    await this.repository.update({ id }, { requestStatus: <any>statusId });
  }

  async findById(
    attrs: IRequestRepository.FindByIdInputAttrs,
  ): IRequestRepository.FindByIdResult {
    const request = await this.findOne(attrs);

    return new Request({
      ...request,
      tenant: new Tenant(request.tenant),
      requestModules: request.requestModules.map(
        (rm) =>
          new RequestModule({
            ...rm,
            module: new Module(rm.moduleRequestType),
            settings: rm.requestSettings,
            request: new Request({
              ...rm.request,
              requestModules: [],
            }),
          }),
      ),
    });
  }

  findOne(attrs: { id: string }) {
    return this.repository.findOne({
      where: { id: attrs.id },
      relations: [
        'requestStatus',
        'tenant',
        'requestModules',
        'requestModules.moduleRequestType',
      ],
    });
  }
}
