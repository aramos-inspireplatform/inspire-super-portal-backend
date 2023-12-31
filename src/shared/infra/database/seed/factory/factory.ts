import { faker } from '@faker-js/faker';
import {
  TenantPayouts,
  TenantsDataMapper,
  Users,
} from '~/shared/infra/database/entities';

export function createRandomTenantPayout(
  tenantId: string,
  userId: string,
): Partial<TenantPayouts> {
  return {
    id: faker.string.uuid(),
    payoutAlternativeId: faker.number.int({ max: 10000, min: 1 }),
    periodStartDate: faker.date.anytime(),
    periodEndDate: faker.date.anytime(),
    amount: faker.number.int({ max: 10000, min: 1000 }),
    termsRecurringIntervalCount: 30,
    customerGrossAmount: faker.number.int({ max: 10000, min: 1000 }),
    customerFeeAmount: faker.number.int({ max: 10000, min: 1000 }),
    paymentGatewayNetAmount: faker.number.int({ max: 10000, min: 1000 }),
    expectedArrivalDate: faker.date.anytime(),
    processedDate: faker.date.anytime(),
    creatorUserId: userId as any,
    statusId: '2eca46d3-40e3-4555-afa6-d8d52b04fa2e' as any,
    processorUserId: userId as any,
    settlementCurrencyId: 'bb2d5ae7-e161-4f24-a0fc-435b1f5f6ac2' as any,
    tenantId: tenantId as any,
    termsRecurringIntervalId: 'cd44a946-bfdd-4370-b2cc-1b3f0df311fd' as any,
    createdDate: faker.date.anytime(),
  };
}

export function createRandomUser(): Partial<Users> {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    createdDate: faker.date.anytime(),
  };
}

export function createRandomTenant(): Partial<TenantsDataMapper> {
  return {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    googleTenantId: faker.string.uuid(),
    createdDate: faker.date.anytime(),
    termsRecurringIntervalCount: 30,
    termsRecurringIntervalId: 'cd44a946-bfdd-4370-b2cc-1b3f0df311fd' as any,
    statusId: 'a217e218-a723-4659-8f3d-9f218310655b' as any,
    totalPaidAmount: faker.number.int({ max: 10000, min: 1000 }),
  };
}
