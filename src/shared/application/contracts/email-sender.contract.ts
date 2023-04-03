export namespace IEmailSender {
  export type ConstructorAttrs = {
    templateName: string;
    subject?: string;
  };
}

export type EmailData =
  | string
  | {
      name?: string | undefined;
      email: string;
    };

type DynamicTemplateData<TDynamicTemplateData> = {
  to: EmailData | EmailData[];
  bcc?: EmailData | EmailData[];
  cc?: EmailData | EmailData[];
  subject: string;
  dynamicTemplateData: TDynamicTemplateData;
  templateName: string;
  templateLanguage?: string;
};

export abstract class IEmailSender<TDynamicTemplateData> {
  public readonly DEFAULT_TEMPLATE_LANGUAGE = 'en-US';
  protected emailMetadata: DynamicTemplateData<TDynamicTemplateData> =
    {} as any;

  constructor(attrs: IEmailSender.ConstructorAttrs) {
    this.emailMetadata.templateName = attrs.templateName;
    this.emailMetadata.subject = attrs.subject;
  }

  setTemplateLanguage({
    templateLanguageIsoCode,
  }: {
    templateLanguageIsoCode?: string;
  }): IEmailSender<TDynamicTemplateData> {
    this.emailMetadata.templateLanguage =
      templateLanguageIsoCode ?? this.DEFAULT_TEMPLATE_LANGUAGE;
    return this;
  }

  setSubject({ subject }: { subject: string }) {
    this.emailMetadata.subject = subject;
    return this;
  }

  setTemplate({ templateName }: { templateName: string }) {
    this.emailMetadata.templateName = templateName;
    return this;
  }

  setTo({ to }: { to: EmailData | EmailData[] }) {
    this.emailMetadata.to = to;
    return this;
  }

  setBcc({ bcc }: { bcc: EmailData | EmailData[] }) {
    this.emailMetadata.bcc = bcc;
    return this;
  }

  setCc({ cc }: { cc: EmailData | EmailData[] }) {
    this.emailMetadata.cc = cc;
    return this;
  }

  getEmailMetadata() {
    return this.emailMetadata;
  }

  abstract buildDynamicTemplateData(
    payload: any,
  ): IEmailSender<TDynamicTemplateData>;

  abstract sendEmail(): Promise<void>;
}
