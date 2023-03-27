import request from 'supertest';
import { faker } from '@faker-js/faker';
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
import { AuthProvidersSymbols } from '~/auth/ioc/providers/auth-providers.symbols';
import { IPasswordHashService } from '~/auth/infra/contracts/services/password-hash-service.contract';

describe('AuthController', () => {
  it('should throw when the payload sent is invalid', async () => {
    await request(app.getHttpServer())
      .post('/auth/sign-in')
      .expect(({ body }) => {
        expect(body).toStrictEqual({
          statusCode: 400,
          message: [
            'email should not be empty',
            'email must be an email',
            'password too weak',
            'password must be shorter than or equal to 50 characters',
            'password must be longer than or equal to 8 characters',
            'password must be a string',
            'password should not be empty',
          ],
          error: 'Bad Request',
        });
      });
  });

  it('should throw InvalidCredentialsException when user not exists', async () => {
    await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({
        email: faker.internet.email(),
        password: `asdfWSVA123asdf@#$`,
      })
      .expect(({ body }) => {
        expect(body).toStrictEqual({
          statusCode: 401,
          message: 'exception:INVALID_CREDENTIALS',
          error: 'Unauthorized',
        });
      });
  });

  it('should return an access and refresh token when sucess', async () => {
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
      .post('/auth/sign-in')
      .send({
        email: userEntity.email,
        password,
      })
      .set('User-Agent', 'supertest')
      .expect(({ body }) => {
        expect(body).toHaveProperty('accessToken');
        expect(body).toHaveProperty('refreshToken');
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
