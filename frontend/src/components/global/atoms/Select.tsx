import { useQuery } from "react-query";
import React from "react";
import axios from "@/lib/axiosConfig";
import { useField } from "formik";

/**
 * | Author- Sanjiv Kumar
 * | Created On- 02-02-2024
 * | Created for- Select Input Field
 * | Status- done
 */

interface SelectProps {
  label: string;
  name: string;
  placeholder?: string;
  value?: number | string;
  api?: string;
  error?: string | undefined;
  type?: string;
  touched?: boolean | undefined;
  readonly?: boolean;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
}

interface Select {
  id: number;
  name?: string;
  type?: string;
}

const Select: React.FC<SelectProps> = (props) => {
  const [, , helpers] = useField(props.name);
 
  const { setValue } = helpers;

  const fieldId = "id_" + props.name;

  const fetchData = async (): Promise<Select[]> => {
    const res = await axios({
      url: props.api,
      method: "GET",
    });

    return res.data?.data;
  };

  const { data: dataList = [], isError: dataError } = useQuery({
    queryKey: [props.name],
    queryFn: fetchData,
  });

  if (dataError) {
    throw new Error("Fatal Error!");
  }

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-secondary text-sm" htmlFor={fieldId}>
          {props.label}
        </label>
        <select
          disabled={props.readonly}
          onChange={(event) => setValue(parseInt(event.target.value))}
          onBlur={props.onBlur}
          value={props.value}
          className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
          id={fieldId}
        >
          <option selected value="">{props.placeholder}</option>
          {dataList.map((d: Select) => (
            <option key={d?.id} value={d?.id}>
              {d?.name || d?.type}
            </option>
          ))}
        </select>

        {props.touched && props.error && (
          <div className="text-red-500">{props.error}</div>
        )}
      </div>
    </>
  );
};

export default Select;
