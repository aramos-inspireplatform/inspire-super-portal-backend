import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { States } from '~/shared/infra/database/entities/states';

@Index('idx__part__uq__countries', ['code'], { unique: true })
@Index('idx__uq__countries', ['code', 'deletedDate'], { unique: true })
@Index('pk__countries', ['id'], { unique: true })
@Entity('countries', { schema: 'public' })
export class Countries extends BaseEntity {
  @Column('character varying', { name: 'name', length: 300 })
  name: string;

  @Column('character varying', { name: 'native_name', length: 300 })
  nativeName: string;

  @Column('character', { name: 'code', length: 2 })
  code: string;

  @Column('character varying', { name: 'dial_code', length: 10 })
  dialCode: string;

  @Column('boolean', { name: 'is_default' })
  isDefault: boolean;

  @Column('boolean', { name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => States, (states) => states.country)
  states: States[];
}
