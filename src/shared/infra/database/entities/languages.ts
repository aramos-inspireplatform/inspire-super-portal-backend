import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { Users } from '~/shared/infra/database/entities/users';

@Index('idx__uq__languages', ['deletedDate', 'isoCode'], { unique: true })
@Index('pk__languages', ['id'], { unique: true })
@Index('idx__part__uq__languages', ['isoCode'], { unique: true })
@Entity('languages', { schema: 'public' })
export class Languages extends BaseEntity {
  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('character varying', { name: 'native_name', length: 100 })
  nativeName: string;

  @Column('character varying', { name: 'iso_code', length: 8 })
  isoCode: string;

  @Column('boolean', { name: 'is_default' })
  isDefault: boolean;

  @Column('boolean', { name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => Users, (users) => users.language)
  users: Relation<Users>[];
}
