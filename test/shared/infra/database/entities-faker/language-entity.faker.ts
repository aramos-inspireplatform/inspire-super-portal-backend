import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { Sync } from 'factory.ts';
import { Languages } from '~/shared/infra/database/entities';

export const LanguageEntityFaker = Sync.makeFactory(() => {
  const entity = new Languages();
  entity.id = randomUUID();
  entity.name = faker.address.country();
  entity.nativeName = faker.address.country();
  entity.isoCode = faker.address.countryCode();
  entity.isDefault = true;
  entity.isActive = true;
  entity.createdDate = new Date();
  return entity;
});
