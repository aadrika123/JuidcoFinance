import React from "react";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 02-02-2024
 * | Created for- Input Field
 * | Status- done
 */

interface InputProps {
  label?: React.ReactNode;
  name?: string;
  type?: string;
  readonly?: boolean;
  placeholder?: string | "";
  value?: string | number | undefined;
  error?: string | undefined;
  touched?: boolean | undefined;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean | false;
}

const Input: React.FC<InputProps> = (props) => {
  const fieldId = "id_" + props.name;
  
  ///// If the Input type will be number then MouseWheeler will be disabled ////////////
  const handleFocus = (e: any)=>{
    if(props.type && props.type === "number"){
      e.target.addEventListener("wheel", function (e: any) { e.preventDefault() });
    }
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {props.label}
          {props.required? (<span className="text-red-600 pl-2">*</span>):("")}
        </label>
        <input
          disabled={props.readonly}
          required={props.required}
          placeholder={props.placeholder}
          onChange={props.onChange}
          onBlur={props.onBlur}
          onFocus={handleFocus}
          type={props.type}
          value={props?.value}
          className={`text-primary h-[40px] p-3 rounded border bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
          id={fieldId}
        />

        {props.touched && props.error && (
          <div className="text-red-500">{props.error}</div>
        )}
      </div>
    </>
  );
};

export default Input;
