import React from "react";

interface RadioButtonProps {
  label: React.ReactNode;
  id: string;
  name: string;
}

const RadioButton: React.FC<RadioButtonProps> = (props) => {
  return (
    <div className="flex items-center">
        <input
            type="radio"
            name={props.name}
            className="text-primary p-3 mr-1 rounded-lg border bg-transparent border-zinc-400"
            id={props.id}
          />
          <label htmlFor="radio1">{props.label}</label>
    </div>
  );
};

export default RadioButton;
