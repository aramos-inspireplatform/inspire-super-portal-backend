import { randomUUID } from 'crypto';
import { Sync } from 'factory.ts';
import { Languages } from '~/shared/infra/database/entities';

export const LanguageEntityFaker = Sync.makeFactory(() => {
  const entity = new Languages();
  entity.id = randomUUID();
  entity.name = 'Brazil';
  entity.nativeName = 'Brasil';
  entity.isoCode = 'pt-br';
  entity.isDefault = true;
  entity.isActive = true;
  entity.createdDate = new Date();
  return entity;
});