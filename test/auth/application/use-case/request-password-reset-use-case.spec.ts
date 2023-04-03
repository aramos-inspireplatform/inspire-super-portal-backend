import { mock, MockProxy } from 'jest-mock-extended';
import { RequestPasswordResetUseCase } from '~/auth/application/use-case/request-password-reset.use-case';
import { IJsonWebTokensGenerator } from '~/auth/infra/contracts/services/json-web-tokens-service.contract';
import { IEmailSender } from '~/shared/application/contracts/email-sender.contract';
import { makeUserFaker } from '~/test/users/faker/user.faker';
import { IUserRepository } from '~/users/infra/contracts/repository/user-repository.contract';

class AnyTemplateBuilder extends IEmailSender<RequestPasswordResetUseCase.EmailResetPassword> {
  buildDynamicTemplateData(
    payload: any,
  ): IEmailSender<RequestPasswordResetUseCase.EmailResetPassword> {
    this.emailMetadata.dynamicTemplateData = {
      email: payload.email,
      token: payload.token,
    };
    return this;
  }

  async sendEmail(): Promise<void> {
    return;
  }
}

const makeSut = () => {
  const mockUserRepository = mock<IUserRepository>();
  const mockRecoveryPasswordJwtGenerator = mock<IJsonWebTokensGenerator>();
  const mockEmailSender = new AnyTemplateBuilder({
    subject: 'any-subject',
    templateName: 'any-template',
  });

  const sut = new RequestPasswordResetUseCase(
    mockUserRepository,
    mockRecoveryPasswordJwtGenerator,
    mockEmailSender,
  );
  return {
    sut,
    mockUserRepository,
    mockRecoveryPasswordJwtGenerator,
    mockEmailSender,
  };
};

describe('RequestPasswordResetUseCase', () => {
  let userRepository: MockProxy<IUserRepository>;
  let recoveryPasswordJwtGenerator: MockProxy<IJsonWebTokensGenerator>;
  let emailSender: AnyTemplateBuilder;

  let requestPasswordResetUseCase: RequestPasswordResetUseCase;

  beforeEach(() => {
    const {
      sut,
      mockUserRepository,
      mockRecoveryPasswordJwtGenerator,
      mockEmailSender,
    } = makeSut();
    requestPasswordResetUseCase = sut;
    userRepository = mockUserRepository;
    recoveryPasswordJwtGenerator = mockRecoveryPasswordJwtGenerator;
    emailSender = mockEmailSender;
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  describe('resetPassword', () => {
    it('should throw when user is not found', async () => {
      await expect(
        requestPasswordResetUseCase.resetPassword({
          email: 'non-found@email.com',
        }),
      ).resolves.toBeUndefined();
    });

    it('should call sendEmail when success', async () => {
      const spyUpdateUser = jest.spyOn(userRepository, 'updateUser');
      const spyEmailSender = jest.spyOn(emailSender, 'sendEmail');
      userRepository.findByEmail.mockResolvedValueOnce(makeUserFaker());
      recoveryPasswordJwtGenerator.sign.mockResolvedValueOnce(
        'any.valid.token',
      );
      await requestPasswordResetUseCase.resetPassword({
        email: 'found@email.com',
      });
      expect(spyUpdateUser).toHaveBeenCalledTimes(1);
      expect(spyEmailSender).toHaveBeenCalledTimes(1);
    });
  });
});
