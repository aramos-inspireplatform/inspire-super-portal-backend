import { randomUUID } from 'crypto';

export function RandomUUIDGeneratorAdapter() {
  return randomUUID();
}
