import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { Users } from '~/shared/infra/database/entities/users';

@Index('idx__uq__time_zones', ['deletedDate', 'name'], { unique: true })
@Index('pk__time_zones', ['id'], { unique: true })
@Index('idx__part__uq__time_zones', ['name'], { unique: true })
@Entity('time_zones', { schema: 'public' })
export class TimeZones extends BaseEntity {
  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('interval', { name: 'utc_offset' })
  utcOffset: any;

  @Column('interval', { name: 'utc_dst_offset' })
  utcDstOffset: any;

  @Column('boolean', { name: 'is_default' })
  isDefault: boolean;

  @Column('boolean', { name: 'is_active' })
  isActive: boolean;

  @OneToMany(() => Users, (users) => users.timeZone)
  users: Relation<Users>[];
}
