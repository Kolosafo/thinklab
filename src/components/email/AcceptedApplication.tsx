import React from "react";

const AcceptedApplication = ({
  accepted,
  email,
  password,
}: {
  accepted: boolean;
  email?: string;
  password?: string;
}) => {
  return (
    <div>
      {accepted ? (
        <h1 className="text-xl">
          Congratulations, Your application was Accepted!
        </h1>
      ) : (
        <h1 className="text-xl">Your Application was rejected</h1>
      )}
      <br />
      <span>
        {accepted
          ? "Use below credentials to log into your dashboard:"
          : `After careful review of your application, our team concluded that you
        are not qualified to market on our platform at the moment. However, you
        can still apply again if you feel like this is a mistake`}
      </span>
      <br />
      <br />
      {accepted && (
        <div>
          <span className="font-semibold">EMAIL: {email}</span>
          <br />
          <span className="font-semibold">PASSWORD: {password}</span>
        </div>
      )}
    </div>
  );
};

export default AcceptedApplication;
