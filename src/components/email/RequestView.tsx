import React from "react";

const RequestView = ({ projectName }: { projectName: string }) => {
  return (
    <div className="flex flex-col space-y-4">
      <span>Your request to view our project {projectName} was recieved.</span>
      <br />
      <br />
      <span className="block" style={{ marginTop: 20 }}>
        We would get back to you on further proceedings.
      </span>
      <span className="block" style={{ marginTop: 20 }}>
        Think-Lab Team
      </span>
    </div>
  );
};

export default RequestView;
