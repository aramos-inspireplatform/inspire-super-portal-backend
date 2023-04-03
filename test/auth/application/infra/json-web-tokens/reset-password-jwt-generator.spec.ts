import { sign, verify } from 'jsonwebtoken';
import { ResetPasswordJwtGenerator } from '~/auth/infra/json-web-tokens/reset-password-jwt-generator';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

const makeSut = () => {
  const jwtSecret = 'test-secret';
  const jwtExpiration = '1h';
  const jwtIssuer = 'test-issuer';
  const accessTokenService = new ResetPasswordJwtGenerator(
    jwtSecret,
    jwtExpiration,
    jwtIssuer,
  );
  return { accessTokenService, jwtSecret, jwtIssuer, jwtExpiration };
};

describe('ResetPasswordJwtGenerator', () => {
  const { accessTokenService, jwtSecret, jwtIssuer, jwtExpiration } = makeSut();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sign', () => {
    test('should call the sign function from the jsonwebtoken module', async () => {
      const payload = { userId: '123' };
      const subject = 'test-subject';
      const expectedToken = 'test-token';

      (sign as jest.Mock).mockReturnValueOnce(expectedToken);

      const token = await accessTokenService.sign({
        payload,
        subject,
      });

      expect(token).toBe(expectedToken);
      expect(sign).toHaveBeenCalledWith(payload, jwtSecret, {
        subject,
        issuer: jwtIssuer,
        expiresIn: jwtExpiration,
      });
    });
  });

  describe('validate', () => {
    test('should call the verify function from the jsonwebtoken module', async () => {
      const token = 'test-token';
      const expectedPayload = { userId: '123' };

      (verify as jest.Mock).mockReturnValueOnce(expectedPayload);

      const payload = await accessTokenService.validate({
        token,
      });

      expect(payload).toEqual(expectedPayload);
      expect(verify).toHaveBeenCalledWith(token, jwtSecret);
    });

    test('should return the error when no throwableError is provided', async () => {
      const token = 'test-token';

      (verify as jest.Mock).mockImplementationOnce(() => {
        throw new Error('test-error');
      });

      await expect(
        accessTokenService.validate({
          token,
        }),
      ).resolves.toBeInstanceOf(Error);
    });
  });
});
