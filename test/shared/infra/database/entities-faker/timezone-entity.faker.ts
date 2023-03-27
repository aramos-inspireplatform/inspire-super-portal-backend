import { faker } from '@faker-js/faker';
import { randomUUID } from 'crypto';
import { Sync } from 'factory.ts';
import { TimeZones } from '~/shared/infra/database/entities';

export const TimeZoneEntityFaker = Sync.makeFactory<TimeZones>(() => {
  const entity = new TimeZones();
  entity.id = randomUUID();
  entity.utcDstOffset = faker.datatype.number();
  entity.utcOffset = faker.datatype.number();
  entity.name = faker.address.timeZone();
  entity.isDefault = true;
  entity.isActive = true;
  entity.createdDate = new Date();
  return entity;
});
