import { MockProxy, mock } from 'jest-mock-extended';
import { SignInUseCase } from '~/auth/application/use-case/sign-in.use-case';
import { InvalidCredentialsException } from '~/auth/domain/exceptions/invalid-credentials.exception';
import { IJsonWebTokensGenerator } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { IPasswordHashService } from '~/auth/infra/contracts/services/password-hash-service.contract';
import { makeUserFaker } from '~/test/users/faker/user.faker';
import { IUserLoginsRepository } from '~/users/infra/contracts/repository/user-logins-repository.contract';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

describe('SignInUseCase', () => {
  let sut: SignInUseCase;
  let mockUserRepository: MockProxy<IUserRepository>;
  let mockPasswordHashService: MockProxy<IPasswordHashService>;
  let mockAccessTokenJwtService: MockProxy<IJsonWebTokensGenerator>;
  let mockRefreshTokenJwtService: MockProxy<IJsonWebTokensGenerator>;
  let mockUserLoginsRepository: MockProxy<IUserLoginsRepository>;

  const loginParams = {
    email: 'any-email@mail.com',
    password: '123',
    userAgent: 'insomnia/2023.1.0',
    ipAddress: '127.0.0.1/32',
  };

  beforeEach(() => {
    mockUserRepository = mock<IUserRepository>();
    mockPasswordHashService = mock<IPasswordHashService>();
    mockAccessTokenJwtService = mock<IJsonWebTokensGenerator>();
    mockRefreshTokenJwtService = mock<IJsonWebTokensGenerator>();
    mockUserLoginsRepository = mock<IUserLoginsRepository>();

    sut = new SignInUseCase(
      mockUserRepository,
      mockPasswordHashService,
      mockAccessTokenJwtService,
      mockRefreshTokenJwtService,
      mockUserLoginsRepository,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should throw when user is not found', async () => {
      mockUserRepository.findByEmail.mockResolvedValueOnce(null);

      await expect(sut.signIn(loginParams)).rejects.toThrow(
        new InvalidCredentialsException(),
      );
    });

    it('should throw when password is not valid', async () => {
      const mockedUser = makeUserFaker();
      mockUserRepository.findByEmail.mockResolvedValueOnce(mockedUser);
      mockPasswordHashService.compare.mockResolvedValueOnce(false);

      await expect(sut.signIn(loginParams)).rejects.toThrow(
        new InvalidCredentialsException(),
      );
    });

    it('should return an accessToken and refreshToken when success', async () => {
      const mockedUser = makeUserFaker();
      mockUserRepository.findByEmail.mockResolvedValueOnce(mockedUser);
      mockPasswordHashService.compare.mockResolvedValueOnce(true);
      mockAccessTokenJwtService.sign.mockResolvedValueOnce(
        'valid.jwt.access-token',
      );
      mockRefreshTokenJwtService.sign.mockResolvedValueOnce(
        'valid.jwt.refresh-token',
      );

      const result = {
        accessToken: 'valid.jwt.access-token',
        refreshToken: 'valid.jwt.refresh-token',
      };

      await expect(sut.signIn(loginParams)).resolves.toStrictEqual(result);
    });
  });
});
