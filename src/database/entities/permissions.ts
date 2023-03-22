import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Actions } from '~/database/entities/actions';
import { BaseEntity } from '~/database/entities/base';
import { RolePermissions } from '~/database/entities/role-permissions';
import { Subjects } from '~/database/entities/subjects';

@Index('idx__uq__permissions', ['deletedDate', 'slug'], { unique: true })
@Index('pk__permissions', ['id'], { unique: true })
@Index('idx__part__uq__permissions', ['slug'], { unique: true })
@Entity('permissions', { schema: 'public' })
export class Permissions extends BaseEntity {
  @Column('character varying', { name: 'name', length: 150 })
  name: string;

  @Column('character varying', { name: 'slug', length: 50 })
  slug: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 500,
  })
  description: string | null;

  @ManyToOne(() => Actions, (actions) => actions.permissions, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'action_id', referencedColumnName: 'id' }])
  action: Actions;

  @ManyToOne(() => Subjects, (subjects) => subjects.permissions, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'subject_id', referencedColumnName: 'id' }])
  subject: Subjects;

  @OneToMany(
    () => RolePermissions,
    (rolePermissions) => rolePermissions.permission,
  )
  rolePermissions: RolePermissions[];
}
