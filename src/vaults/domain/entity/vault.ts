import { RandomUUIDGeneratorAdapter } from '~/shared/application/adapters/uuid-generator.adapter';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class Vault extends BaseDomainEntity {
  name: string;
  isActive: boolean;
  integrationCode?: string;

  constructor(attrs: InstanceProperties<Vault>) {
    super(attrs);
    this.id = attrs.id ?? RandomUUIDGeneratorAdapter();
    this.name = attrs.name;
    this.isActive = attrs.isActive;
    this.integrationCode = attrs.integrationCode;
  }
}
