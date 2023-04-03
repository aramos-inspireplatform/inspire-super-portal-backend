import { IEmailSender } from '~/shared/application/contracts/email-sender.contract';

class EmailSenderStubAdapter extends IEmailSender<any> {
  buildDynamicTemplateData(payload: any): IEmailSender<any> {
    this.emailMetadata.dynamicTemplateData = payload;
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async sendEmail(): Promise<void> {}
}

const makeSut = () => {
  const sut = new EmailSenderStubAdapter({
    templateName: 'stub-template',
  });

  return {
    sut,
  };
};

describe('IEmailSender', () => {
  let emailSender: EmailSenderStubAdapter;

  beforeEach(() => {
    const { sut } = makeSut();
    emailSender = sut;
  });

  it('should set bcc', () => {
    emailSender.setBcc({
      bcc: [
        {
          email: 'bcc@email.com',
          name: 'bcc',
        },
      ],
    });

    expect(emailSender.getEmailMetadata().bcc).toStrictEqual([
      {
        email: 'bcc@email.com',
        name: 'bcc',
      },
    ]);
  });

  it('should set subject', () => {
    emailSender.setSubject({
      subject: 'any-subject',
    });

    expect(emailSender.getEmailMetadata().subject).toBe('any-subject');
  });

  it('should set template', () => {
    emailSender.setTemplate({
      templateName: 'any-template',
    });

    expect(emailSender.getEmailMetadata().templateName).toBe('any-template');
  });

  it('should set cc', () => {
    emailSender.setCc({
      cc: [
        {
          email: 'cc@email.com',
          name: 'cc',
        },
      ],
    });

    expect(emailSender.getEmailMetadata().cc).toStrictEqual([
      {
        email: 'cc@email.com',
        name: 'cc',
      },
    ]);
  });

  it('should set to', () => {
    emailSender.setTo({
      to: [
        {
          email: 'to@email.com',
          name: 'to',
        },
      ],
    });

    expect(emailSender.getEmailMetadata().to).toStrictEqual([
      {
        email: 'to@email.com',
        name: 'to',
      },
    ]);
  });

  it('should set template language', () => {
    emailSender.setTemplateLanguage({ templateLanguageIsoCode: undefined });

    expect(emailSender.getEmailMetadata().templateLanguage).toBe(
      emailSender.DEFAULT_TEMPLATE_LANGUAGE,
    );
  });
});
