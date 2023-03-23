import { Column, Entity, Index, OneToMany } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { Permissions } from '~/shared/infra/database/entities/permissions';

@Index('idx__uq__actions', ['deletedDate', 'slug'], { unique: true })
@Index('pk__actions', ['id'], { unique: true })
@Index('idx__part__uq__actions', ['slug'], { unique: true })
@Entity('actions', { schema: 'public' })
export class Actions extends BaseEntity {
  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('character varying', { name: 'slug', length: 50 })
  slug: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 500,
  })
  description: string | null;

  @OneToMany(() => Permissions, (permissions) => permissions.action)
  permissions: Permissions[];
}
