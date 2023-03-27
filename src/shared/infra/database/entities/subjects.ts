import { Column, Entity, Index, OneToMany, Relation } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { Permissions } from '~/shared/infra/database/entities/permissions';

@Index('idx__uq__subjects', ['deletedDate', 'slug'], { unique: true })
@Index('pk__subjects', ['id'], { unique: true })
@Index('idx__part__uq__subjects', ['slug'], { unique: true })
@Entity('subjects', { schema: 'public' })
export class Subjects extends BaseEntity {
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

  @OneToMany(() => Permissions, (permissions) => permissions.subject)
  permissions: Relation<Permissions>[];
}
