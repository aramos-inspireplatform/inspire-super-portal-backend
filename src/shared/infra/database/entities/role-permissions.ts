import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { Permissions } from '~/shared/infra/database/entities/permissions';
import { Roles } from '~/shared/infra/database/entities/roles';

@Index('idx__uq__role_permissions', ['deletedDate', 'permissionId', 'roleId'], {
  unique: true,
})
@Index(
  'idx__role_permissions__permission_id',
  ['deletedDate', 'permissionId'],
  {},
)
@Index('pk__role_permissions', ['id'], { unique: true })
@Index('idx__part__uq__role_permissions', ['permissionId', 'roleId'], {
  unique: true,
})
@Entity('role_permissions', { schema: 'public' })
export class RolePermissions extends BaseEntity {
  @Column('uuid', { name: 'role_id' })
  roleId: string;

  @Column('uuid', { name: 'permission_id' })
  permissionId: string;

  @ManyToOne(() => Permissions, (permissions) => permissions.rolePermissions, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'permission_id', referencedColumnName: 'id' }])
  permission: Permissions;

  @ManyToOne(() => Roles, (roles) => roles.rolePermissions, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'role_id', referencedColumnName: 'id' }])
  role: Roles;
}
