import { MockProxy, mock } from 'jest-mock-extended';
import { SignInUseCase } from '~/auth/application/use-case/sign-in.use-case';
import { InvalidCredentialsException } from '~/auth/domain/exceptions/unauthorized.exception';
import { IJsonWebTokensService } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { IPasswordHashService } from '~/auth/infra/contracts/services/password-hash-service.contract';
import { makeUserFaker } from '~/test/users/faker/user.faker';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

const makeSut = () => {
  const mockUserRepository = mock<IUserRepository>();
  const mockPasswordHashService = mock<IPasswordHashService>();
  const mockAccessTokenJwtService = mock<IJsonWebTokensService>();
  const mockRefreshTokenJwtService = mock<IJsonWebTokensService>();

  const sut = new SignInUseCase(
    mockUserRepository,
    mockPasswordHashService,
    mockAccessTokenJwtService,
    mockRefreshTokenJwtService,
  );

  return {
    sut,
    mockUserRepository,
    mockPasswordHashService,
    mockAccessTokenJwtService,
    mockRefreshTokenJwtService,
  };
};

describe('SignInUseCase', () => {
  let userRepository: MockProxy<IUserRepository>;
  let signInUseCase: SignInUseCase;
  let passwordHashService: MockProxy<IPasswordHashService>;
  let accessTokenJwtService: MockProxy<IJsonWebTokensService>;
  let refreshTokenJwtService: MockProxy<IJsonWebTokensService>;

  beforeEach(() => {
    const {
      sut,
      mockUserRepository,
      mockPasswordHashService,
      mockAccessTokenJwtService,
      mockRefreshTokenJwtService,
    } = makeSut();
    signInUseCase = sut;
    userRepository = mockUserRepository;
    passwordHashService = mockPasswordHashService;
    accessTokenJwtService = mockAccessTokenJwtService;
    refreshTokenJwtService = mockRefreshTokenJwtService;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should throw when user is not found', async () => {
      userRepository.findByEmail.mockResolvedValueOnce(null);
      await expect(
        signInUseCase.signIn({ email: 'any-email@mail.com', password: '123' }),
      ).rejects.toThrow(new InvalidCredentialsException());
    });

    it('should throw when password is not valid', async () => {
      const mockedUser = makeUserFaker();
      userRepository.findByEmail.mockResolvedValueOnce(mockedUser);
      passwordHashService.compare.mockResolvedValueOnce(false);
      await expect(
        signInUseCase.signIn({ email: 'any-email@mail.com', password: '123' }),
      ).rejects.toThrow(new InvalidCredentialsException());
    });

    it('should return an accessToken and refreshToken when success', async () => {
      const mockedUser = makeUserFaker();
      userRepository.findByEmail.mockResolvedValueOnce(mockedUser);
      passwordHashService.compare.mockResolvedValueOnce(true);
      accessTokenJwtService.sign.mockResolvedValueOnce(
        'valid.jwt.access-token',
      );
      refreshTokenJwtService.sign.mockResolvedValueOnce(
        'valid.jwt.refresh-token',
      );

      const result = {
        accessToken: 'valid.jwt.access-token',
        refreshToken: 'valid.jwt.refresh-token',
      };

      await expect(
        signInUseCase.signIn({ email: 'any-email@mail.com', password: '123' }),
      ).resolves.toStrictEqual(result);
    });
  });
});
