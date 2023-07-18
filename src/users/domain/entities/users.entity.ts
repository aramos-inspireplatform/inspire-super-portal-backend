import { TenantPayoutsEntity } from '~/payouts/domain/entities/tenant-payouts.entity';
import { BaseDomainEntity } from '~/shared/domain/entity/base-domain.entity';
import { InstanceProperties } from '~/shared/types/class-properties.type';

export class UsersEntity extends BaseDomainEntity {
  firstName: string;
  lastName: string;
  email: string;
  creatorUsersId: TenantPayoutsEntity[];
  deleterUsersId: TenantPayoutsEntity[];
  processorUsersId: TenantPayoutsEntity[];
  updaterUsersId: TenantPayoutsEntity[];

  constructor(attrs: InstanceProperties<UsersEntity>) {
    super(attrs);
    this.firstName = attrs?.firstName;
    this.lastName = attrs?.lastName;
    this.email = attrs?.email;
    this.creatorUsersId = attrs?.creatorUsersId;
    this.deleterUsersId = attrs?.deleterUsersId;
    this.processorUsersId = attrs?.processorUsersId;
    this.updaterUsersId = attrs?.updaterUsersId;
  }
}
