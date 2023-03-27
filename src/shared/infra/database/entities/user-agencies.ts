import { Entity, Index, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { Agencies } from '~/shared/infra/database/entities/agencies';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { Users } from '~/shared/infra/database/entities/users';

@Index('pk__user_agencies', ['id'], { unique: true })
@Entity('user_agencies', { schema: 'public' })
export class UserAgencies extends BaseEntity {
  @ManyToOne(() => Agencies, (agencies) => agencies.userAgencies, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'agencies_id', referencedColumnName: 'id' }])
  agencies: Relation<Agencies>;

  @ManyToOne(() => Users, (users) => users.userAgencies, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'users_id', referencedColumnName: 'id' }])
  users: Relation<Users>;
}
