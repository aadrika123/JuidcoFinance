import { useQuery } from "react-query";
import React from "react";
import axios from "@/lib/axiosConfig";

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
  readonly?: boolean;
  className?: string;
  visibility?: boolean;
  selectFirstItem?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  initHandler?: (value: number, text: string) => void;
}

interface Select {
  id: number;
  name?: string;
  type?: string;
  code?: string;
  description?: string;
  ulbs?: string;
}

const Select: React.FC<SelectProps> = (props) => {

  const fetchData = async (): Promise<Select[]> => {
    const res = await axios({
      url: props.api,
      method: "GET",
    });
    
    const data = res.data?.data;
    if(props.initHandler){
      props.initHandler(data[0].id, data[0].name);
    }
    return data;
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
        <label className="text-secondary text-sm">
          {props.label}
        </label>
        <select
          disabled={props.readonly}
          onChange={props.onChange}
          value={props.value}
          className={`text-primary h-[40px] pl-3 rounded-lg border bg-transparent border-zinc-400 ${props.className}`}
          name={props.name}
        >
          {props.placeholder && (<option selected value="">
            {props.placeholder}
          </option>)}
          {dataList.length > 0 &&
            dataList.map((d: Select, i) => (
              <option
                selected={props.selectFirstItem?i==0?true:false:false}
                key={d?.id}
                value={d?.id}
                data-name={
                  d?.name ||
                  d?.type ||
                  (d?.code && d?.description
                    ? `${d.code}-${d?.description}`
                    : d?.code) ||
                  d?.ulbs
                }

              >
                {d?.name ||
                  d?.type ||
                  (d?.code && d?.description
                    ? `${d.code}-${d?.description}`
                    : d?.code) ||
                  d?.ulbs}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};

export default Select;
