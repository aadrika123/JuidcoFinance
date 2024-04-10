import React, { useEffect, useState } from "react";
import DebouncedSearch from "@/components/global/atoms/DebouncedSearch";
import Popup from "@/components/global/molecules/general/Popup";
import LedgerDetailsComponent from "./LedgerDetailsComponent";
import GeneralLedgerDetailsComponent from "./GeneralLedgerDetailsComponent";
import ScheduleDetailsComponent from "./ScheduleDetailsComponent";
import { escapeRegExp } from "jflib";
import AccountingTable from "../molecules/AccountingTable";
import Loader from "@/components/global/atoms/Loader";
import { AccountingTableData } from "../types";
import Select from "@/components/global/atoms/nonFormik/Select";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";


const PrimaryAccountingCode: React.FC = () => {
  enum CodeType { Schedule = 1, GeneralLedger = 2, Ledger = 3 }
  const [account, setAccount] = useState<AccountingTableData | null>();
  const [loading, setLoading] = useState<boolean>(true);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [tableData, setTableData] = useState<AccountingTableData[]>([]);
  const [searchCondition, setSearchCondition] = useState<RegExp | null>(null);
  const [hideZeroBalances, setHideZeroBalances] = useState<boolean>(false);
  const [ulbID, setUlbID] = useState<number>(0);
  const [finYear, setFinYear] = useState<number>(0);
  const [ulbName, setUlbName] = useState<string>("");


  const onViewButtonClick = (d: AccountingTableData) => {
    setAccount(d);
  }

  //#FFCD00

  const closePopup = () => {
    setAccount(null);
  }


  const fetchData = async (): Promise<AccountingTableData[]> => {

    if(ulbID == 0 || finYear == 0){
      return [];
    }
    setLoading(true);
    setHideZeroBalances(false);

    const res = await axios({
      url:
        `/balance-trackings/get-balances`,
      method: "GET",
      params: {
        ulb: ulbID,
        year: finYear
      }
    });

    console.log(res.data?.data);

    setTableData(res.data?.data);

    if (res.data.status) {
      return res.data?.data;
    }

    throw "Something Went Wrong!!";
  };


  const {
    data: accountData = [],
    isError: dataError,
  } = useQuery(["get-account-codes", ulbID, finYear], fetchData, {
    cacheTime: 0
  });

  if (dataError) {
    console.log(dataError);
    throw new Error("Fatal Error!");
  }

  useEffect(() => {
    setLoading(true);
  }, [searchText, hideZeroBalances])

  useEffect(() => {
    const escapedST = escapeRegExp(searchText);
    const reg = new RegExp(`(${escapedST})`, "gi");
    if (searchText.length == 0) {
      if (!hideZeroBalances) {
        setTableData(accountData);
        setSearchCondition(null);
      } else {
        setTableData(tableData.filter(function (el) {
          return el.balance != 0;
        }));
      }
    } else {
      setTableData(accountData.filter(function (el) {
        const text = el.code.concat(el.description);
        return hideZeroBalances ? el.balance != 0 && text.search(reg) != -1 : text.search(reg) != -1;
      }));
      setSearchCondition(reg);
    }

  }, [searchText, hideZeroBalances]);

  useEffect(() => {
    setLoading(false);
  }, [tableData]);


  const setUlb = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const ele = event.target;
    setUlbID(parseInt(ele.value));
    setUlbName(ele.options[ele.selectedIndex].text);
  }

  const finYearInitHandler = (value: number, text: string) => {
    setFinYear(value);
  }

  const ulbInitHandler = (value: number, text: string) => {
    setUlbID(value);
    setUlbName(text);
  }
  
  return (
    <>

      {account != null && account.code_type == CodeType.Ledger && (
        <>
          <Popup zindex={50} width={90}>
            <LedgerDetailsComponent data={account} onClose={closePopup} ulbName={ulbName}/>
          </Popup>
        </>
      )}

      {account != null && account.code_type == CodeType.GeneralLedger && (
        <>
          <Popup zindex={50} width={80}>
            <GeneralLedgerDetailsComponent generalLedgerId={account.id} ulbId={ulbID} year={finYear} onClose={closePopup}  />
          </Popup>
        </>
      )}

      {account != null && account.code_type == CodeType.Schedule && (
        <>
          <Popup zindex={50} width={80}>
            <ScheduleDetailsComponent scheduleId={account.id} ulbId={ulbID} year={finYear} onClose={closePopup} />
          </Popup>
        </>
      )}



      <section className="border bg-white shadow-2xl p-6 px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center p-2 border rounded border-blue-500">
              <input
                id="default-checkbox"
                type="checkbox"
                checked={hideZeroBalances}
                className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onChange={(event) => setHideZeroBalances(event.target.checked)}
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 text-lg font-medium text-blue-500"
              >
                Hide zero balances
              </label>
            </div>

            <div className="text-primary_green rounded-md px-2 pb-1 bg-primary_green text-sub_head font-semibold flex items-center">
              <Select
                label=""
                name="fin_year"
                className="w-48 text-primary_green bg-white outline-none"
                api={`/balance-trackings/get-fin-years`}
                onChange={(event) => setFinYear(parseInt(event.target.value))}
                value={finYear}
                initHandler={finYearInitHandler}
              />
            </div>

            <div className="text-primary_green rounded-md px-2 pb-1 bg-primary_green text-sub_head font-semibold flex items-center">
              <Select
                label=""
                name="ulb_id"
                className="w-48 text-primary_green bg-white outline-none"
                api={`${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`}
                onChange={setUlb}
                value={ulbID}
                initHandler={ulbInitHandler}
              />
            </div>


          </div>



          <DebouncedSearch onChange={setSearchText} debounceDuration={500} onSearching={setSearching} />
        </div>

        <div className="mt-8">
          {(loading || searching) ? (<Loader />) : (
            <AccountingTable data={tableData} onViewButtonClick={onViewButtonClick} searchCondition={searchCondition} hideZeroBalances={hideZeroBalances} />
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
