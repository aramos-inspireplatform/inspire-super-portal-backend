import request from 'supertest';
import { app } from '../../helper/create-application.helper';
import { faker } from '@faker-js/faker';

describe('AuthController.SignIn', () => {
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
        password: faker.internet.password(),
      })
      .expect(({ body }) => {
        expect(body).toStrictEqual({
          statusCode: 401,
          message: 'exception:INVALID_CREDENTIALS',
          error: 'Unauthorized',
        });
      });
  });
});
