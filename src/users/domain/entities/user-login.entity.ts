import { InstanceProperties } from '~/shared/types/class-properties.type';

export class UserLogin {
  id: string;

  createdDate: Date;

  ipAddress: string;

  userAgent: string;

  userId: string;

  constructor(attrs: InstanceProperties<UserLogin>) {
    this.id = attrs.id;
    this.createdDate = attrs.createdDate;
    this.ipAddress = attrs.ipAddress;
    this.userAgent = attrs.userAgent;
    this.userId = attrs.userId;
  }
}
