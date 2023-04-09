import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { SystemConfigurations } from '~/shared/infra/database/entities/system-configurations';

@Index('idx__uq__general_data_types', ['deletedDate', 'name'], { unique: true })
@Index('pk__general_data_types', ['id'], { unique: true })
@Index('idx__part__uq__general_data_types', ['name'], { unique: true })
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
