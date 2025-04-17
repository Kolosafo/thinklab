import { fetchClient } from "@/utils/BASE_API";

export const sendApplicationEmail = async (email: string) => {
  await fetchClient("/api/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject: "Application Recieved",
      email: email,
    }),
  });
};

export const applicationReviewedEmail = async ({
  email,
  accepted,
  password,
}: {
  email: string;
  accepted: boolean;
  password?: string;
}) => {
  await fetchClient("/api/review-application", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject: `Application ${accepted ? "Accepted" : "Declined"}`,
      email,
      status: accepted,
      password,
    }),
  });
};

export const requestViewing = async (data: {
  projectName: string;
  name: string;
  email: string;
  phone: string;
  selectedDate: string;
  subject: string;
}) => {
  await fetchClient("/api/request-viewing", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
    }),
  });
};
