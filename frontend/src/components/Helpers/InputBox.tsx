import React from "react";

interface InputBoxProps {
  label: React.ReactNode;
  name: string;
  data?: string[];
  value: string | number | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e?: React.FocusEvent<HTMLInputElement>) => void;
}

const InputBox: React.FC<InputBoxProps> = (props) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-secondary text-sm" htmlFor="browser">
          {props.label}
        </label>
        <input
          placeholder="text"
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          className="text-primary p-3 rounded-lg border bg-transparent border-zinc-400"
          list="browsers"
          name={props.name}
          id="browser"
        />
        <datalist id="browsers" className="w-full bg-zinc-200 text-primary">
          <option value="Edge" />
          <option value="Firefox" />
          <option value="Chrome" />
          <option value="Opera" />
          <option value="Safari" />
        </datalist>
        {props.touched && props.error && (
          <div className="text-red-500">{props.error}</div>
        )}
      </div>
    </>
  );
};

export default InputBox;
