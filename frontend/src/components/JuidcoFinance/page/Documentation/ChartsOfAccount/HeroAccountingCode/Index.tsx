import React, { useEffect, useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import AccountingTable from "@/components/Helpers/Tables/AccountingTable";

import type { AccountingTableData } from "@/utils/types/types";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";
import Popup from "@/components/global/molecules/general/Popup";
import LedgerDetailsComponent from "./LedgerDetailsComponent";
import GeneralLedgerDetailsComponent from "./GeneralLedgerDetailsComponent";
import ScheduleDetailsComponent from "./ScheduleDetailsComponent";
import Loader from "@/components/Helpers/Basic/Loader";

type PrimaryAccountingProps = {
  data: AccountingTableData[];
};

const PrimaryAccountingCode: React.FC<PrimaryAccountingProps> = (props) => {
  enum CodeType { Schedule = 1, GeneralLedger = 2, Ledger = 3 }
  const [account, setAccount] = useState<AccountingTableData | null>();
  const [searching, setSearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [tableData, setTableData] = useState<AccountingTableData[]>(props.data);
  const [searchCondition, setSearchCondition] = useState<RegExp | null>(null);

  const onViewButtonClick = (d: AccountingTableData) => {
    setAccount(d);
  }

  //#FFCD00

  const closePopup = () => {
    setAccount(null);
  }

  useEffect(() => {
    const reg = new RegExp(`(${searchText})`, "gi");
    if (searchText.length == 0) {
      setTableData(props.data);
      setSearchCondition(null);
    } else {
      setTableData(props.data.filter(function (el) {
        return el.description.search(reg) != -1;
      }));
      setSearchCondition(reg);
    }
  }, [searchText]);


  return (
    <>
   
      {account != null && account.code_type == CodeType.Ledger && (
        <>
          <Popup zindex={50} width={90}>
            <LedgerDetailsComponent data={account} onClose={closePopup} />
          </Popup>
        </>
      )}

      {account != null && account.code_type == CodeType.GeneralLedger && (
        <>
          <Popup zindex={50} width={80}>
            <GeneralLedgerDetailsComponent generalLedgerId={account.id} onClose={closePopup} />
          </Popup>
        </>
      )}

      {account != null && account.code_type == CodeType.Schedule && (
        <>
          <Popup zindex={50} width={80}>
            <ScheduleDetailsComponent scheduleId={account.id} onClose={closePopup} />
          </Popup>
        </>
      )}



      <section className="border bg-white shadow-2xl p-6 px-10">
        <div className="flex items-center justify-between">
          <SubHeading>Primary Accounting Codes</SubHeading>
          <DebouncedSearch onChange={setSearchText} debounceDuration={500} onSearching={setSearching} />
        </div>

        <div className="mt-8">
          {searching ? (<Loader />) : (
              <AccountingTable data={tableData} onViewButtonClick={onViewButtonClick} searchCondition={searchCondition} />
          )}
        </div>

        <div className="flex items-center justify-between mt-5 gap-5">
          <div>
            Found {tableData.length} Records
          </div>
        </div>


      </section>
    </>
  );
};

export default PrimaryAccountingCode;
