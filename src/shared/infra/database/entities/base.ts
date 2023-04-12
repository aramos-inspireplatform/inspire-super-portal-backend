import {
  BaseEntity as TypeOrmBaseEntity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  BeforeSoftRemove,
} from 'typeorm';
import { RandomUUIDGeneratorAdapter } from '~/shared/application/adapters/uuid-generator.adapter';

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

  @BeforeInsert()
  setCreatedDate() {
    this.id = RandomUUIDGeneratorAdapter();
    this.createdDate = new Date();
  }

  @BeforeUpdate()
  setUpdatedDate() {
    this.updatedDate = new Date();
  }

  @BeforeSoftRemove()
  setDeletedDate() {
    this.deletedDate = new Date();
  }
}
