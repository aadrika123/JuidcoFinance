import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import Table from "@/components/Helpers/Tables/Table";
import { MuncipalityTableData } from "@/utils/types/types";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";

type HeroMuncipalityCodeProps = {
  data: MuncipalityTableData[];
  onSearchTextChange: (e: string) => void;
};

const HeroMuncipalityCode: React.FC<HeroMuncipalityCodeProps> = (props) => {
  return (
    <section className="border bg-white shadow-2xl p-6 px-10">
      <div className="flex items-center justify-between">
        <SubHeading>Municipality Codes</SubHeading>
        <DebouncedSearch onChange={props.onSearchTextChange} />
      </div>

      <div className="mt-8 mb-4">
        <Table data={props.data} />
      </div>

      <div>
           Found {props.data.length} Records
        </div>
        
    </section>
  );
};

export default HeroMuncipalityCode;
