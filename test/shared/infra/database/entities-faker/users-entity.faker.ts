import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { Sync } from 'factory.ts';
import { Users } from '~/shared/infra/database/entities';
import { LanguageEntityFaker } from '~/test/shared/infra/database/entities-faker/language-entity.faker';
import { TimeZoneEntityFaker } from '~/test/shared/infra/database/entities-faker/timezone-entity.faker';

export const UserEntityFaker = Sync.makeFactory<Users>(() => {
  const entity = new Users();
  entity.id = randomUUID();
  entity.firstName = faker.name.firstName();
  entity.lastName = faker.name.lastName();
  entity.email = faker.internet.email();
  entity.passwordHash = `$2b$12$FtTnoPpOrHM4RWsuXIcBLewZw/2Fh89YSjrQiJaZE5GEWLv9Feg2y`;
  entity.securityToken = `any-security-token`;
  entity.accessFailedCount = 0;
  entity.lockoutEndDate = null;
  entity.adminBlockedDate = null;
  entity.logoutDate = null;
  entity.language = LanguageEntityFaker.build();
  entity.timeZone = TimeZoneEntityFaker.build();
  entity.createdDate = new Date();
  return entity;
});
