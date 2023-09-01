import { Column, Entity } from 'typeorm';
import { BaseEntity } from '~/shared/infra/database/entities/base';

@Entity('countries', { schema: 'public' })
export class Countries extends BaseEntity {
  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('character varying', { name: 'flag_svg_url', length: 400 })
  flagSvgUrl: string;

  @Column('character varying', { name: 'native_name', length: 200 })
  nativeName: string;

  @Column('character varying', { name: 'code', length: 2 })
  code: string;

  @Column('character varying', { name: 'integration_code', length: 50 })
  integrationCode: string;
}
