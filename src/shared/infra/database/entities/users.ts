import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';
import { Languages } from '~/shared/infra/database/entities/languages';
import { States } from '~/shared/infra/database/entities/states';
import { TimeZones } from '~/shared/infra/database/entities/time-zones';
import { UserAgencies } from '~/shared/infra/database/entities/user-agencies';
import { UserAllowedTenants } from '~/shared/infra/database/entities/user-allowed-tenants';
import { UserLogins } from '~/shared/infra/database/entities/user-logins';
import { UserRoles } from '~/shared/infra/database/entities/user-roles';

@Index('idx__uq__users', ['deletedDate', 'email'], { unique: true })
@Index('idx__part__uq__users', ['email'], { unique: true })
@Index('pk__users', ['id'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users extends BaseEntity {
  @Column('character varying', { name: 'first_name', length: 200 })
  firstName: string;

  @Column('character varying', { name: 'last_name', length: 200 })
  lastName: string;

  @Column('character varying', { name: 'email', length: 300 })
  email: string;

  @Column('character varying', { name: 'password_hash', nullable: true })
  passwordHash: string | null;

  @Column('character varying', { name: 'security_token', nullable: true })
  securityToken: string | null;

  @Column('smallint', { name: 'access_failed_count' })
  accessFailedCount: number;

  @Column('timestamp with time zone', {
    name: 'lockout_end_date',
    nullable: true,
  })
  lockoutEndDate: Date | null;

  @Column('timestamp with time zone', {
    name: 'admin_blocked_date',
    nullable: true,
  })
  adminBlockedDate: Date | null;

  @Column('timestamp with time zone', { name: 'logout_date', nullable: true })
  logoutDate: Date | null;

  @OneToMany(() => UserAgencies, (userAgencies) => userAgencies.users)
  userAgencies: UserAgencies[];

  @OneToMany(
    () => UserAllowedTenants,
    (userAllowedTenants) => userAllowedTenants.users,
  )
  userAllowedTenants: UserAllowedTenants[];

  @OneToMany(() => UserLogins, (userLogins) => userLogins.user)
  userLogins: UserLogins[];

  @OneToMany(() => UserRoles, (userRoles) => userRoles.user)
  userRoles: UserRoles[];

  @ManyToOne(() => States, (states) => states.users, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'address_state_id', referencedColumnName: 'id' }])
  addressState: States;

  @ManyToOne(() => Languages, (languages) => languages.users, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'language_id', referencedColumnName: 'id' }])
  language: Languages;

  @ManyToOne(() => TimeZones, (timeZones) => timeZones.users, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'time_zone_id', referencedColumnName: 'id' }])
  timeZone: TimeZones;
}
