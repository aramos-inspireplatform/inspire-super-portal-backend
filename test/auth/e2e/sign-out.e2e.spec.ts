import request from 'supertest';
import { app } from '~/test/helper/create-application.helper';
import { LanguageEntityFaker } from '~/test/shared/infra/database/entities-faker/language-entity.faker';
import { TimeZoneEntityFaker } from '~/test/shared/infra/database/entities-faker/timezone-entity.faker';
import { databaseInsert } from '~/test/helper/database/insert.helper';
import {
  Languages,
  TimeZones,
  UserLogins,
  Users,
} from '~/shared/infra/database/entities';
import { UserEntityFaker } from '~/test/shared/infra/database/entities-faker/users-entity.faker';
import {
  databaseClearTableFromEntity,
  databaseDeleteFromEntities,
} from '~/test/helper/database/delete.helper';
import { AuthProvidersSymbols } from '~/auth/ioc/auth-providers.symbols';
import { IPasswordHashService } from '~/auth/infra/contracts/services/password-hash-service.contract';
import { databaseFindByIdHelper } from '~/test/helper/database/get-by-id.helper';

jest.setTimeout(30000000);

describe('AuthController.SignOut', () => {
  const baseUrl = '/auth/sign-out';

  it("should throw when user aren't authenticated", async () => {
    await request(app.getHttpServer())
      .post(baseUrl)
      .expect(({ body }) => {
        expect(body).toStrictEqual({
          statusCode: 401,
          message: 'exception:UNAUTHORIZED',
          error: 'Unauthorized',
        });
      });
  });

  it('should throw when user send a invalid jwt', async () => {
    await request(app.getHttpServer())
      .post(baseUrl)
      .set({ Authorization: 'Bearer invalid.jwt.token' })
      .expect(({ body }) => {
        expect(body).toStrictEqual({
          statusCode: 401,
          message: 'exception:UNAUTHORIZED',
          error: 'Unauthorized',
        });
      });
  });

  it('should logout the user', async () => {
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

    const {
      body: { accessToken },
    } = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({
        email: userEntity.email,
        password,
      })
      .set('User-Agent', 'supertest');

    await request(app.getHttpServer())
      .post(baseUrl)
      .set({ Authorization: `Bearer ${accessToken}` })
      .expect(async () => {
        const loggoutUser = await databaseFindByIdHelper({
          entity: Users,
          id: userEntity.id,
        });

        expect(loggoutUser.logoutDate).not.toBeNull();
      });

    await databaseClearTableFromEntity({ entity: UserLogins });

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
