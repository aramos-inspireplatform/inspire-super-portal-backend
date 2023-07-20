import { DataSource } from 'typeorm';
import { UsersEntity } from '~/users/domain/entities/users.entity';
import { IUserRepository } from '~/shared/infra/database/repositories/contracts';
import { Users } from '~/shared/infra/database/entities';

export class UserRepositoryTypeOrmAdapter implements IUserRepository {
  constructor(private readonly dataSource: DataSource) {}

  async save(input: UsersEntity): Promise<void> {
    const repository = this.dataSource.getRepository<Users>(Users);

    const entity = repository.create({
      id: input.id,
      createdDate: input.createdDate,
      updatedDate: input.updatedDate,
      deletedDate: input.deletedDate,
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
    });

    await repository.save(entity);
  }
}
