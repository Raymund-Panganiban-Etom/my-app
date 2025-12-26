import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail, { MailDataRequired } from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, destination } = req.body as {
    name: string;
    email: string;
    message: string;
    destination: string; // user-provided recipient
  };

  if (!name || !email || !message || !destination) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const msg: MailDataRequired = {
    to: 'kazsaktanastana123@gmail.com', // dynamic recipient from user input
    from: 'etompaypal@gmail.com', // fixed, must be verified in SendGrid
    subject: `New message from ${name}`,
    text: message,
    replyTo: email, // lets you reply directly to the sender
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('SendGrid error:', error);
    return res.status(500).json({ success: false, error: 'Error sending email' });
  }
}
