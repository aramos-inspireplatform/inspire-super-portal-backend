import { InstanceProperties } from '~/shared/types/class-properties.type';
import { User } from '~/users/domain/entities/user.entity';
import { faker } from '@faker-js/faker';
import { RandomUUIDGeneratorAdapter } from '~/shared/application/adapters/uuid-generator.adapter';

export const makeUserFaker = (attrs?: Partial<InstanceProperties<User>>) => {
  const fakerInstanceAttrs: InstanceProperties<User> = {
    accessFailedCount: 0,
    adminBlockedDate: null,
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    id: RandomUUIDGeneratorAdapter(),
    lastName: faker.name.lastName(),
    lockoutEndDate: null,
    passwordHash: faker.lorem.word(),
    securityToken: faker.lorem.word(),
  };
  const classAttrs = Object.assign({}, fakerInstanceAttrs, attrs);
  const user = new User(classAttrs);
  return user;
};
