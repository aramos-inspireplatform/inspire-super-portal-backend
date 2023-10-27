import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

import { SystemConfigurations } from './SystemConfigurations';

@Entity('general_data_types', { schema: 'public' })
export class GeneralDataTypes extends BaseEntity {
  @Column('character varying', { name: 'name', length: 40 })
  name: string;

  @OneToMany(
    () => SystemConfigurations,
    (systemConfigurations) => systemConfigurations.generalDataType,
  )
  systemConfigurations: Relation<SystemConfigurations[]>;
}
