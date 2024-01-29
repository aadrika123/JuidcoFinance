import React from "react";

interface InputBoxProps {
  label: string;
  name: string;
  data?: string[];
  value: string | number | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  isDatalist?: boolean | true;
  onChange: (e?: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e?: React.FocusEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputBox: React.FC<InputBoxProps> = (props) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-secondary text-sm" htmlFor="browser">
          {props.label}
        </label>
        <input
          type={props.type || 'text'}
          placeholder="text"
          onChange={props.onChange}
          onBlur={props.onBlur}
          value={props.value}
          className={`text-primary h-[40px] p-3 rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
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
