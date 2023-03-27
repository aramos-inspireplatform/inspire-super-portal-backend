import { randomUUID } from 'crypto';
import { Sync } from 'factory.ts';
import { TimeZones } from '~/shared/infra/database/entities';

export const TimeZoneEntityFaker = Sync.makeFactory<TimeZones>(() => {
  const entity = new TimeZones();
  entity.id = randomUUID();
  entity.utcDstOffset = 3;
  entity.utcOffset = 3;
  entity.name = 'timezone';
  entity.isDefault = true;
  entity.isActive = true;
  entity.createdDate = new Date();
  return entity;
});
