import { Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Agencies } from '~/database/entities/agencies';
import { BaseEntity } from '~/database/entities/base';
import { Users } from '~/database/entities/users';

@Index('pk__user_agencies', ['id'], { unique: true })
@Entity('user_agencies', { schema: 'public' })
export class UserAgencies extends BaseEntity {
  @ManyToOne(() => Agencies, (agencies) => agencies.userAgencies, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'agencies_id', referencedColumnName: 'id' }])
  agencies: Agencies;

  @ManyToOne(() => Users, (users) => users.userAgencies, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'users_id', referencedColumnName: 'id' }])
  users: Users;
}
