import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '~/database/entities/base';
import { Users } from '~/database/entities/users';

@Index('pk__user_logins', ['id'], { unique: true })
@Entity('user_logins', { schema: 'public' })
export class UserLogins extends BaseEntity {
  @Column('cidr', { name: 'ip_address' })
  ipAddress: string;

  @Column('character varying', { name: 'user_agent' })
  userAgent: string;

  @ManyToOne(() => Users, (users) => users.userLogins, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: Users;
}
