import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export const sendEmail = ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: subject,
    html: message,
  });
};
