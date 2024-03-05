import React from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import AccountingTable from "@/components/Helpers/Tables/AccountingTable";
import type { AccountingTableData } from "@/utils/types/types";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";

type PrimaryAccountingProps = {
  data: AccountingTableData[];
  onSearchTextChange: (e: string) => void;
};

const PrimaryAccountingCode: React.FC<PrimaryAccountingProps> = (props) => {
  return (
    <>
      <section className="border rounded-lg bg-white border-primary_green p-6 px-10">
        <div className="flex items-center justify-between">
          <SubHeading>Primary Accounting Codes</SubHeading>
          <DebouncedSearch onChange={props.onSearchTextChange} />
        </div>

        <div className="mt-8">
          <AccountingTable data={props.data} />
        </div>

        <div className="flex items-center justify-between mt-5 gap-5">
        <div>
           Found {props.data.length} Records
        </div>
        </div>


      </section>
    </>
  );
};

export default PrimaryAccountingCode;
