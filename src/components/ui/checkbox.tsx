import React from "react";

const Checkbox = ({
  onChange,
  checked,
  fieldName,
}: {
  onChange: (fieldName: string, val: boolean) => void;
  checked: boolean;
  fieldName: string;
}) => {
  return (
    <div className="flex space-x-8">
      <div className="flex items-center space-x-1">
        <span>Yes</span>
        <input
          type="checkbox"
          name={fieldName}
          id={fieldName}
          className="text-2xl h-4 w-4"
          checked={checked}
          onChange={() => onChange(fieldName, true)}
        />
      </div>
      <div className="flex items-center space-x-1">
        <span>No</span>
        <input
          type="checkbox"
          name={fieldName}
          id={fieldName}
          className="text-2xl h-4 w-4"
          checked={!checked}
          onChange={() => onChange(fieldName, false)}
        />
      </div>
    </div>
  );
};

export default Checkbox;
