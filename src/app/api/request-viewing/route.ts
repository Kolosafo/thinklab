import RequestView from "@/components/email/RequestView";
import { Resend } from "resend";

const resend = new Resend("re_j39S8xnB_FYaQNxn9rsJkp9yarCezUpfi");

export async function POST(request: Request) {
  try {
    const { projectName, name, email, phone, selectedDate, subject } =
      await request.json();
    console.log("Data: ", name, phone, selectedDate, subject);
    const { data, error } = await resend.emails.send({
      from: "Think-Lab Properties <admin@thinklabproperties.com>",
      to: [email, "kolosafo@gmail.com"],
      subject,
      react: RequestView({
        projectName,
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
