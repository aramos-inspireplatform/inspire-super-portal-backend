import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { GeneralDataTypes } from './GeneralDataTypes';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Entity('system_configurations', { schema: 'public' })
export class SystemConfigurations extends BaseEntity {
  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 1000,
  })
  description: string | null;

  @Column('character varying', { name: 'slug', length: 20 })
  slug: string;

  @Column('boolean', { name: 'is_global' })
  isGlobal: boolean;

  @Column('boolean', { name: 'is_hidden' })
  isHidden: boolean;

  @Column('integer', { name: 'int_value', nullable: true })
  intValue: number | null;

  @Column('boolean', { name: 'bool_value', nullable: true })
  boolValue: boolean | null;

  @Column('character varying', { name: 'string_value', nullable: true })
  stringValue: string | null;

  @Column('uuid', { name: 'uuid_value', nullable: true })
  uuidValue: string | null;

  @Column('timestamp with time zone', {
    name: 'timestamp_value',
    nullable: true,
  })
  timestampValue: Date | null;

  @ManyToOne(
    () => GeneralDataTypes,
    (generalDataTypes) => generalDataTypes.systemConfigurations,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'general_data_type_id', referencedColumnName: 'id' }])
  generalDataType: Relation<GeneralDataTypes>;
}
