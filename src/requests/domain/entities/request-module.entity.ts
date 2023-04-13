import { Module } from '~/requests/domain/entities/module.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class RequestModule extends BaseDomainEntity {
  module: Module;
  settings: object;

  constructor(attrs: InstanceProperties<RequestModule>) {
    super(attrs);
    this.module = attrs.module;
    this.settings = attrs.settings;
  }
}
