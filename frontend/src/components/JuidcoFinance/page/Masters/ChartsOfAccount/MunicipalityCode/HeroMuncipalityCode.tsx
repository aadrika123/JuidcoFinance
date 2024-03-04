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
    <section className="border rounded-lg bg-white border-primary_green p-6 px-10">
      <div className="flex items-center justify-between">
        <SubHeading>Municipality Codes</SubHeading>
        <DebouncedSearch onChange={props.onSearchTextChange} />
      </div>

      <div className="mt-8">
        <Table data={props.data} />
      </div>
    </section>
  );
};

export default HeroMuncipalityCode;
