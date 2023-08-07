import { Users } from '~/shared/infra/database/entities/Users';

declare module '~/shared/infra/database/entities/Users' {
  interface Users {
    getName(): string;
    getFirstName(): string;
    getLastName(): string;
  }
}

Users.prototype.getName = function getName() {
  return (
    this.getFirstName() + (this.getLastName() ? ` ${this.getLastName()}` : '')
  );
};

Users.prototype.getFirstName = function getFirstName() {
  return this.firstName?.trim() ?? null;
};

Users.prototype.getLastName = function getLastName() {
  return this.lastName?.trim() ?? null;
};
