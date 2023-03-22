import { Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '~/database/entities/base';
import { Tenants } from '~/database/entities/tenants';
import { Users } from '~/database/entities/users';

@Index('pk__user_allowed_tenants', ['id'], { unique: true })
@Entity('user_allowed_tenants', { schema: 'public' })
export class UserAllowedTenants extends BaseEntity {
  @ManyToOne(() => Tenants, (tenants) => tenants.userAllowedTenants, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'tenants_id', referencedColumnName: 'id' }])
  tenants: Tenants;

  @ManyToOne(() => Users, (users) => users.userAllowedTenants, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'users_id', referencedColumnName: 'id' }])
  users: Users;
}
