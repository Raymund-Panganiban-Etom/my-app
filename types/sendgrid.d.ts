// declare module '@sendgrid/mail';

declare module '@sendgrid/mail' {
  export interface MailDataRequired {
    to: string;
    from: string;
    subject: string;
    text?: string;
    html?: string;
    replyTo?: string;
  }

  const sgMail: {
    setApiKey(apiKey: string): void;
    send(data: MailDataRequired): Promise<any>;
  };

  export default sgMail;
}

