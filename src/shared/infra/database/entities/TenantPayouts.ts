import { Entity } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Entity('tenant_payouts', { schema: 'public' })
export class TenantPayouts extends BaseEntity {}
