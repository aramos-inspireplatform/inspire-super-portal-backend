import { dataSource } from '~/shared/infra/database/config';
import * as Factory from './factory/factory';
import { faker } from '@faker-js/faker';
import {
  TenantPayouts,
  TenantsDataMapper,
  Users,
} from '~/shared/infra/database/entities';

(async () => {
  const user = Factory.createRandomUser();

  const tenant = Factory.createRandomTenant();

  const tanantPayout = faker.helpers.multiple(
    () => Factory.createRandomTenantPayout(tenant.id, user.id),
    {
      count: 150,
    },
  );

  try {
    const connection = await dataSource.initialize();

    const userRepository = connection.getRepository(Users);
    const tenantRepository = connection.getRepository(TenantsDataMapper);
    const tanantPayoutRepository = connection.getRepository(TenantPayouts);

    await userRepository.save(user);
    await tenantRepository.save(tenant);
    await tanantPayoutRepository.save(tanantPayout);

    console.log('Success');
    return true;
  } catch (error) {
    console.error(error);
    return true;
  }
})();
