import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '~/database/entities/base';
import { Countries } from '~/database/entities/countries';
import { Users } from '~/database/entities/users';

@Index('idx__uq__states', ['code', 'countryId', 'deletedDate'], {
  unique: true,
})
@Index('idx__part__uq__states', ['code', 'countryId'], { unique: true })
@Index('pk__states', ['id'], { unique: true })
@Entity('states', { schema: 'public' })
export class States extends BaseEntity {
  @Column('uuid', { name: 'country_id' })
  countryId: string;

  @Column('character varying', { name: 'name', length: 300 })
  name: string;

  @Column('character', { name: 'code', length: 2 })
  code: string;

  @Column('boolean', { name: 'is_active' })
  isActive: boolean;

  @ManyToOne(() => Countries, (countries) => countries.states, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Countries;

  @OneToMany(() => Users, (users) => users.addressState)
  users: Users[];
}
