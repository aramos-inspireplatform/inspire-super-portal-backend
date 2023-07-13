import { UserTypesEnum } from '~/auth/domain/enums/user-types.enum.dto';

export class UserAuthDto {
  readonly userObjectId: string; // 6153611e2daa238fc1f67ac4
  readonly userTypeSlug: string; // "system_admin"
  readonly userName: string; // "Super User"
  readonly userEmail: string; // "teste@xyz.com"
  readonly authTime: number; // 1687223100485

  constructor(claims?: {
    userId?: string | null;
    userType?: string | null;
    name?: string | null;
    email?: string | null;
    authTime?: number | null;
  }) {
    this.userObjectId = claims?.userId;
    this.userTypeSlug = claims?.userType;
    this.userName = claims?.name;
    this.userEmail = claims?.email;
    this.authTime = claims?.authTime;
  }

  isSystemAdmin = function (): boolean {
    return this.userTypeSlug === UserTypesEnum.SYSTEM_ADMIN;
  };

  isAgencyAdmin = function (): boolean {
    return this.userTypeSlug === UserTypesEnum.AGENCY_ADMIN;
  };
}
