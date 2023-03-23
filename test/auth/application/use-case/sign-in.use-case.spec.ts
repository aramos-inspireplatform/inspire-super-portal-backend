import { AuthSignInService } from '~/auth/application/use-case/sign-in.use-case';
import { IJwtService } from '~/auth/infra/json-web-tokens/services/jwt.service';
import { IPasswordHashService } from '~/auth/infra/password-hash/services/password-hash.service';
import { mock, MockProxy } from 'jest-mock-extended';
import { InvalidCredentialsException } from '~/auth/domain/exceptions/unauthorized.exception';

const makeSut = () => {
  const mockJwtService = mock<IJwtService>();
  const mockPasswordHashService = mock<IPasswordHashService>();
  const sut = new AuthSignInService(mockPasswordHashService, mockJwtService);
  return {
    sut,
    mockJwtService,
    mockPasswordHashService,
  };
};

class ErrorExample extends Error {
  constructor() {
    super();
  }
}

describe('AuthSignInService', () => {
  let signInService: AuthSignInService;
  let passwordHash: MockProxy<IPasswordHashService>;
  let jwtService: MockProxy<IJwtService>;

  beforeEach(() => {
    const { sut, mockPasswordHashService, mockJwtService } = makeSut();
    signInService = sut;
    passwordHash = mockPasswordHashService;
    jwtService = mockJwtService;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should throw when password is invalid', async () => {
    const user: AuthSignInService.AuthUser = {
      email: 'any-email@mail.com',
      id: 'any-id',
      passwordHash: 'hash-password',
    };
    passwordHash.compare.mockResolvedValueOnce(false);
    expect(
      signInService.signIn({
        user,
        password: 'invalid-password',
      }),
    ).rejects.toThrow(new InvalidCredentialsException());
  });

  it('should throw correct error when invalid login', async () => {
    const user: AuthSignInService.AuthUser = {
      email: 'any-email@mail.com',
      id: 'any-id',
      passwordHash: 'hash-password',
    };
    passwordHash.compare.mockResolvedValueOnce(false);
    expect(
      signInService.signIn({
        user,
        password: 'invalid-password',
        throwableError: ErrorExample,
      }),
    ).rejects.toThrow(new ErrorExample());
  });

  it('should return accessToken and refreshToken on success', async () => {
    const user: AuthSignInService.AuthUser = {
      email: 'any-email@mail.com',
      id: 'any-id',
      passwordHash: 'hash-password',
    };
    passwordHash.compare.mockResolvedValueOnce(true);
    jwtService.sign.mockResolvedValueOnce('any-access-token');
    jwtService.sign.mockResolvedValueOnce('any-refresh-token');
    expect(
      signInService.signIn({
        user,
        password: 'hash-password',
      }),
    ).resolves.toStrictEqual({
      accessToken: 'any-access-token',
      refreshToken: 'any-refresh-token',
    });
  });
});
