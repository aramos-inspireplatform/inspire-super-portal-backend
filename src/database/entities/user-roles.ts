import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '~/database/entities/base';
import { Roles } from '~/database/entities/roles';
import { Users } from '~/database/entities/users';

@Index('idx__uq__user_roles', ['deletedDate', 'roleId', 'userId'], {
  unique: true,
})
@Index('idx__user_roles__role_id', ['deletedDate', 'roleId'], {})
@Index('pk__user_roles', ['id'], { unique: true })
@Index('idx__part__uq__user_roles', ['roleId', 'userId'], { unique: true })
@Entity('user_roles', { schema: 'public' })
export class UserRoles extends BaseEntity {
  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('uuid', { name: 'role_id' })
  roleId: string;

  @ManyToOne(() => Roles, (roles) => roles.userRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Roles;

  @ManyToOne(() => Users, (users) => users.userRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
