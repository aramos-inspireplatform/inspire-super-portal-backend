import { Language } from '~/languages/domain/entity/language.entity';
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

  logoutDate: Date | null;

  language?: Language;

  updatedDate?: Date;

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
    this.logoutDate = attrs.logoutDate;
    this.language = attrs.language;
  }

  /**
   * By default, accessFailedCount is incremented by 1, but if count is provided,
   * then accessFailedCount is incremented by the value provided by count
   * @param count Number
   */
  incrementAccessFailedCount(count = 1) {
    this.accessFailedCount += count;
  }

  /**
   * Set the property accessFailedCount to 0
   */
  resetAccessFailedCount() {
    this.accessFailedCount = 0;
  }

  /**
   * Set the `logoutDate` of the user
   * This flag is used to invalided previously generated access tokens
   */
  signOut() {
    this.logoutDate = new Date();
  }
}
