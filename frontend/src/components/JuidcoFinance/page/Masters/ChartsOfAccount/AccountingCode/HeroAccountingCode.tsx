import React, { useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import AccountingTable from "@/components/Helpers/Tables/AccountingTable";
import type { AccountingTableData } from "@/utils/types/types";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";
import Popup from "@/components/global/molecules/general/Popup";
import LedgerDetailsComponent from "../molecules/LedgerDetailsComponent";
import GeneralLedgerDetailsComponent from "../molecules/GeneralLedgerDetailsComponent";
import ScheduleDetailsComponent from "../molecules/ScheduleDetailsComponent";

type PrimaryAccountingProps = {
  data: AccountingTableData[];
  onSearchTextChange: (e: string) => void;
};

const PrimaryAccountingCode: React.FC<PrimaryAccountingProps> = (props) => {
  enum CodeType {Schedule = 1, GeneralLedger = 2, Ledger = 3}; 
  const [account, setAccount] = useState<AccountingTableData | null>();

  const onViewButtonClick = (d: AccountingTableData) => {
    setAccount(d);    
  }

  const closePopup = () => {
    setAccount(null);
  }
  return (
    <>
      { account != null && account.code_type == CodeType.Ledger && (
        <>
        <Popup zindex={40} width={90}>
          <LedgerDetailsComponent data={account} onClose={closePopup}/>
        </Popup>
        </>
      )}

      { account != null && account.code_type == CodeType.GeneralLedger && (
        <>
          <Popup zindex={40} width={80}>
            <GeneralLedgerDetailsComponent generalLedgerId = {account.id} onClose={closePopup}/>
          </Popup>
        </>
      )}

    { account != null && account.code_type == CodeType.Schedule && (
        <>
        <Popup zindex={40} width={80}>
          <ScheduleDetailsComponent scheduleId={account.id} onClose={closePopup}/>
        </Popup>
        </>
      )}



      <section className="border bg-white shadow-2xl p-6 px-10">
        <div className="flex items-center justify-between">
          <SubHeading>Primary Accounting Codes</SubHeading>
          <DebouncedSearch onChange={props.onSearchTextChange} debounceDuration={100}/>
        </div>

        <div className="mt-8">
          <AccountingTable data={props.data} onViewButtonClick={onViewButtonClick}/>
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
