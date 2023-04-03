import { Users } from '~/shared/infra/database/entities';
import { LanguageMapperToDomain } from '~/shared/infra/database/mapper/language.mapper';
import { Mapper } from '~/shared/infra/database/mapper/mapper';
import { User } from '~/users/domain/entities/user.entity';

export const UserModelToDomainMapper = (model: Users) =>
  Mapper(
    model,
    (model) =>
      new User({
        accessFailedCount: model.accessFailedCount,
        adminBlockedDate: model.adminBlockedDate,
        email: model.email,
        firstName: model.firstName,
        id: model.id,
        lastName: model.lastName,
        lockoutEndDate: model.lockoutEndDate,
        passwordHash: model.passwordHash,
        securityToken: model.securityToken,
        language: LanguageMapperToDomain(model.language),
      }),
  );
