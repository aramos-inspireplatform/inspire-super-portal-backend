import { MockProxy, mock } from 'jest-mock-extended';
import { PasswordResetUseCase } from '~/auth/application/use-case/password-reset.use-case';
import { PasswordAndConfirmationPasswordShouldBeEqualException } from '~/auth/domain/exceptions/password-and-confirmation-password-should-be-equal.exception';
import { IPasswordHashService } from '~/auth/infra/contracts/services/password-hash-service.contract';
import { User } from '~/users/domain/entities/user.entity';
import { UserNotFoundException } from '~/users/domain/exceptions/user-not-found.exception';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

const makeSut = () => {
  const mockUserRepository = mock<IUserRepository>();
  const mockPasswordHash = mock<IPasswordHashService>();

  const sut = new PasswordResetUseCase(mockUserRepository, mockPasswordHash);

  return {
    sut,
    mockUserRepository,
    mockPasswordHash,
  };
};

describe('PasswordResetUseCase', () => {
  let passwordResetUseCase: PasswordResetUseCase;
  let userRepository: MockProxy<IUserRepository>;
  let passwordHash: MockProxy<IPasswordHashService>;

  beforeEach(() => {
    const { sut, mockPasswordHash, mockUserRepository } = makeSut();
    passwordResetUseCase = sut;
    passwordHash = mockPasswordHash;
    userRepository = mockUserRepository;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('resetPassword', () => {
    it('should throw PasswordAndConfirmationPasswordShouldBeEqualException if passwords do not match', async () => {
      const inputAttrs = {
        securityToken: 'abc123',
        password: 'password',
        confirmationPassword: 'different-password',
      };
      const user = {
        id: '123',
        passwordHash: 'old-password',
      } as User;

      userRepository.findBySecurityToken.mockResolvedValueOnce(user);

      await expect(
        passwordResetUseCase.resetPassword(inputAttrs),
      ).rejects.toThrow(PasswordAndConfirmationPasswordShouldBeEqualException);
    });

    it('should throw UserNotFoundException if user is not found', async () => {
      const inputAttrs = {
        securityToken: 'abc123',
        password: 'password',
        confirmationPassword: 'password',
      };

      userRepository.findBySecurityToken.mockResolvedValueOnce(null);

      await expect(
        passwordResetUseCase.resetPassword(inputAttrs),
      ).rejects.toThrow(UserNotFoundException);
      expect(userRepository.findBySecurityToken).toHaveBeenCalledWith({
        securityToken: inputAttrs.securityToken,
      });
    });

    it('should hash the new password and update the user', async () => {
      const inputAttrs = {
        securityToken: 'abc123',
        password: 'password',
        confirmationPassword: 'password',
      };

      const user = {
        id: '123',
        passwordHash: 'old-password',
      } as User;

      userRepository.findBySecurityToken.mockResolvedValueOnce(user);
      passwordHash.hashPassword.mockResolvedValueOnce('new-password-hash');

      await passwordResetUseCase.resetPassword(inputAttrs);

      expect(passwordHash.hashPassword).toHaveBeenCalledWith({
        password: inputAttrs.password,
      });
      expect(userRepository.updateUser).toHaveBeenCalledWith({
        user: { ...user, passwordHash: 'new-password-hash' },
      });
    });
  });
});
