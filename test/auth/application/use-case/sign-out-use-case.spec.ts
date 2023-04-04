import { mock } from 'jest-mock-extended';
import { SignOutUseCase } from '~/auth/application/use-case/sign-out.use-case';
import { makeUserFaker } from '~/test/users/faker/user.faker';
import { UserNotFoundException } from '~/users/domain/exceptions/user-not-found.exception';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

describe('SignOutUseCase', () => {
  const mockUserRepository = mock<IUserRepository>();

  const useCase = new SignOutUseCase(mockUserRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signOut', () => {
    it('should throw UserNotFoundException if user not found', async () => {
      mockUserRepository.findById.mockResolvedValueOnce(undefined);

      await expect(useCase.signOut({ userId: '123' })).rejects.toThrow(
        UserNotFoundException,
      );

      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findById).toHaveBeenCalledWith({ id: '123' });
      expect(mockUserRepository.updateUser).not.toHaveBeenCalled();
    });

    it('should update user with sign out date if user exists', async () => {
      const user = makeUserFaker();
      mockUserRepository.findById.mockResolvedValueOnce(user);

      await useCase.signOut({ userId: user.id });

      expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.findById).toHaveBeenCalledWith({ id: user.id });
      expect(mockUserRepository.updateUser).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.updateUser).toHaveBeenCalledWith({ user });
    });
  });
});
