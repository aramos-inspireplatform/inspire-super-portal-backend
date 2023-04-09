import {
  BaseEntity as TypeOrmBaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryColumn('uuid', { primary: true, name: 'id' })
  id: string;

  @Column({ type: 'bigint', name: 'alternative_id' })
  alternativeId: string;

  @CreateDateColumn({ type: 'timestamp with time zone', name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updated_date',
    nullable: true,
  })
  updatedDate: Date | null;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    name: 'deleted_date',
    nullable: true,
  })
  deletedDate: Date | null;
}
