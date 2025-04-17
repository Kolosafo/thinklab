import React from "react";

const ApplicationEmail = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold">Application Recieved</h1>
      <span>
        Congratulations, your application was recieved. We will review and send
        you a feedback soon.
      </span>
      <span style={{ marginTop: 20 }}>Think-Lab Team</span>
    </div>
  );
};

export default ApplicationEmail;
