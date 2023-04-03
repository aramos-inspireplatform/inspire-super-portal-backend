import { isJWT } from 'class-validator';
import request from 'supertest';
import { IPasswordHashService } from '~/auth/infra/contracts/services/password-hash-service.contract';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';
import { Languages, TimeZones, Users } from '~/shared/infra/database/entities';
import {
  app,
  dataSource,
  mockQueueService,
} from '~/test/helper/create-application.helper';
import { databaseDeleteFromEntities } from '~/test/helper/database/delete.helper';
import { databaseInsert } from '~/test/helper/database/insert.helper';
import { LanguageEntityFaker } from '~/test/shared/infra/database/entities-faker/language-entity.faker';
import { TimeZoneEntityFaker } from '~/test/shared/infra/database/entities-faker/timezone-entity.faker';
import { UserEntityFaker } from '~/test/shared/infra/database/entities-faker/users-entity.faker';

describe('AuthController.passwordResetRequest', () => {
  const baseUrl = '/auth/password-reset-request';

  it('should throw when payload is invalid', async () => {
    await request(app.getHttpServer())
      .post(baseUrl)
      .send({})
      .expect(({ body }) => {
        expect(body).toStrictEqual({
          statusCode: 400,
          message: ['email should not be empty', 'email must be an email'],
          error: 'Bad Request',
        });
      });
  });

  it('should update the user set the security token when success', async () => {
    const spySendEmail = jest.spyOn(mockQueueService, 'sendMessage');

    const languageEntity = LanguageEntityFaker.build();
    const timezoneEntity = TimeZoneEntityFaker.build();
    const password = 'myAwes0mePa455w0rd';

    const userEntity = UserEntityFaker.build({
      language: { id: languageEntity.id },
      timeZone: { id: timezoneEntity.id },
      passwordHash: await app
        .get<IPasswordHashService>(AuthProvidersSymbols.PASSWORD_HASH_SERVICE)
        .hashPassword({ password }),
    });

    await databaseInsert({
      entity: TimeZones,
      values: [timezoneEntity],
    });
    await databaseInsert({
      entity: Languages,
      values: [languageEntity],
    });

    await databaseInsert({
      entity: Users,
      values: [userEntity],
    });

    await request(app.getHttpServer())
      .post(baseUrl)
      .send({
        email: userEntity.email,
      })
      .expect(async () => {
        const user: Users = await dataSource
          .createQueryBuilder(Users, 'users')
          .where('id = :id', { id: userEntity.id })
          .getOne();

        expect(spySendEmail).toHaveBeenCalledTimes(1);

        expect(isJWT(user.securityToken)).toBeTruthy();
      });

    await databaseDeleteFromEntities({
      entity: Users,
      values: [userEntity],
    });

    await databaseDeleteFromEntities({
      entity: TimeZones,
      values: [timezoneEntity],
    });
    await databaseDeleteFromEntities({
      entity: Languages,
      values: [languageEntity],
    });
  });
});
