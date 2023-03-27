import { InstanceProperties } from '~/shared/types/class-properties.type';

export class User {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  passwordHash: string | null;

  securityToken: string | null;

  accessFailedCount: number;

  lockoutEndDate: Date | null;

  adminBlockedDate: Date | null;

  constructor(attrs: InstanceProperties<User>) {
    this.id = attrs.id;
    this.firstName = attrs.firstName;
    this.lastName = attrs.lastName;
    this.email = attrs.email;
    this.passwordHash = attrs.passwordHash;
    this.securityToken = attrs.securityToken;
    this.accessFailedCount = attrs.accessFailedCount;
    this.lockoutEndDate = attrs.lockoutEndDate;
    this.adminBlockedDate = attrs.adminBlockedDate;
  }

  /**
   * By default, accessFailedCount is incremented by 1, but if count is provided,
   * then accessFailedCount is incremented by the value provided by count
   * @param count Number
   */
  incrementAccessFailedCount(count = 1) {
    this.accessFailedCount += count;
  }
}
