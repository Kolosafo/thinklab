import { Resend } from "resend";
import * as React from "react";
import ApplicationEmail from "@/components/email/ApplicationEmail";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email, subject } = await request.json();
    const { data, error } = await resend.emails.send({
      from: "Think-Lab Properties <admin@thinklabproperties.com>",
      to: [email],
      subject: subject,
      react: ApplicationEmail() as React.ReactElement,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
