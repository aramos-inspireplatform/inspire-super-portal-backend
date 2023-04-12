import { Entity, Index } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Index('pk__templates', ['id'], { unique: true })
@Entity('templates', { schema: 'public' })
export class Templates extends BaseEntity {}
