import React, { useEffect, useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";
import Popup from "@/components/global/molecules/general/Popup";
import LedgerDetailsComponent from "./LedgerDetailsComponent";
import GeneralLedgerDetailsComponent from "./GeneralLedgerDetailsComponent";
import ScheduleDetailsComponent from "./ScheduleDetailsComponent";
import { escapeRegExp } from "@/utils/helper";
import AccountingTable from "../molecules/AccountingTable";
import Loader from "@/components/global/atoms/Loader";
import { AccountingTableData } from "../types";

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
  const [hideZeroBalances, setHideZeroBalances] = useState<boolean>(false);


  const onViewButtonClick = (d: AccountingTableData) => {
    setAccount(d);
  }

  //#FFCD00

  const closePopup = () => {
    setAccount(null);
  }

  

  useEffect(() => {
    const escapedST = escapeRegExp(searchText);
    const reg = new RegExp(`(${escapedST})`, "gi");
    if (searchText.length == 0) {
      if(!hideZeroBalances){
        setTableData(props.data);
        setSearchCondition(null);  
      }else{
        setTableData(props.data.filter(function (el) {
          return el.balance!=0;
        }));
      }
    } else {
      setTableData(props.data.filter(function (el) {
        const text = el.code.concat(el.description);
        return hideZeroBalances? el.balance!=0 && text.search(reg) != -1 : text.search(reg) != -1;
      }));
      setSearchCondition(reg);
    }
  }, [searchText, hideZeroBalances]);



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
              <AccountingTable data={tableData} onViewButtonClick={onViewButtonClick} searchCondition={searchCondition} handleHideZeroBalancesCheckbox={setHideZeroBalances} hideZeroBalances={hideZeroBalances}/>
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
