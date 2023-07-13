import { UserTypesEnum } from '~/auth/domain/enums/user-types.enum.dto';

export class UserAuthDto {
  readonly userObjectId: string; // 6153611e2daa238fc1f67ac4
  readonly userTypeSlug: string; // "system_admin"
  readonly userName: string; // "Super User"
  readonly userEmail: string; // "teste@xyz.com"
  readonly authTime: number; // 1687223100485
  readonly iat: number;
  readonly exp: number;
  readonly agencies: Agency[];

  constructor(
    user?: {
      userId?: string | null;
      userType?: string | null;
      name?: string | null;
      email?: string | null;
      authTime?: number | null;
      iat?: number | null;
      exp?: number | null;
    },
    agencies?: Agency[] | null,
  ) {
    this.userObjectId = user?.userId;
    this.userTypeSlug = user?.userType;
    this.userName = user?.name;
    this.userEmail = user?.email;
    this.authTime = user?.authTime;
    this.iat = user?.iat;
    this.exp = user?.exp;
    this.agencies = agencies ?? [];
  }

  updateAgencies = function (agencies): void {
    if (!agencies) return;

    this.agencies = agencies.map((agency) => ({
      id: agency.uuid,
      objectId: agency.id,
    }));
  };

  isSystemAdmin = function (): boolean {
    return this.userTypeSlug === UserTypesEnum.SYSTEM_ADMIN;
  };

  isAgencyAdmin = function (): boolean {
    return this.userTypeSlug === UserTypesEnum.AGENCY_ADMIN;
  };
}

type Agency = {
  id: string;
  objectId: string;
};
