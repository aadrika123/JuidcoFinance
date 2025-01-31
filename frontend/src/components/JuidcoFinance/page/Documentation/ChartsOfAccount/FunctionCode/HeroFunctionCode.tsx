import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import FunctionCodeTable from "@/components/Helpers/Tables/FunctionCodeTable";
import { FunctionTableData } from "@/utils/types/types";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";

type FunctionCodeProps = {
  data: FunctionTableData[];
  onSearchTextChange: (e: string) => void;
};

const FunctionCode: React.FC<FunctionCodeProps> = (props) => {
  return (
    <>
      <section className="border bg-white shadow-2xl p-6 px-10">
        <div className="flex items-center justify-between">
          <SubHeading>Function codes</SubHeading>
          <DebouncedSearch onChange={props.onSearchTextChange} />
        </div>

        <div className="mt-8 mb-4">
          <FunctionCodeTable data={props.data} />
        </div>

        <div>
           Found {props.data.length} Records
        </div>
        
      </section>
    </>
  );
};

export default FunctionCode;
