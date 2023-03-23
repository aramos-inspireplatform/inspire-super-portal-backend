import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { RolePermissions } from '~/shared/infra/database/entities/role-permissions';
import { UserRoles } from '~/shared/infra/database/entities/user-roles';

@Index('idx__uq__roles', ['deletedDate', 'name'], { unique: true })
@Index('pk__roles', ['id'], { unique: true })
@Index('idx__part__uq__roles', ['name'], { unique: true })
@Entity('roles', { schema: 'public' })
export class Roles extends BaseEntity {
  @Column('character varying', { name: 'name', length: 150 })
  name: string;

  @Column('boolean', { name: 'is_user_default' })
  isUserDefault: boolean;

  @Column('boolean', { name: 'is_admin_default' })
  isAdminDefault: boolean;

  @OneToMany(() => RolePermissions, (rolePermissions) => rolePermissions.role)
  rolePermissions: RolePermissions[];

  @OneToMany(() => UserRoles, (userRoles) => userRoles.role)
  userRoles: UserRoles[];
}
