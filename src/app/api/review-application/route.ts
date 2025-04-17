import AcceptedApplication from "@/components/email/AcceptedApplication";
import { Resend } from "resend";

const resend = new Resend("re_j39S8xnB_FYaQNxn9rsJkp9yarCezUpfi");

export async function POST(request: Request) {
  try {
    const { email, subject, status, password } = await request.json();
    const { data, error } = await resend.emails.send({
      from: "Think-Lab Properties <admin@thinklabproperties.com>",
      to: [email],
      subject: subject,
      react: AcceptedApplication({
        email,
        accepted: status,
        password,
      }) as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
