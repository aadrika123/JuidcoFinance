"use client";
// ------------------------- CHART OF ACCOUNTS ----------------------- //

import React, { lazy, useEffect, useState } from "react";
import { SubHeading } from "@/components/Helpers/Heading";
import HeroMuncipalityCode from "./MunicipalityCode/HeroMuncipalityCode";
const PrimaryAccountingCode = lazy(
  () => import("./AccountingCode/HeroAccountingCode")
);
import axios from "@/lib/axiosConfig";
import FunctionCode from "./FunctionCode/HeroFunctionCode";
import { useQuery } from "react-query";
import Loader from "@/components/Helpers/Basic/Loader";
import type {
  ChartsOfAccountsProps,
  AccountingTableData,
  FunctionTableData,
  MuncipalityTableData,
} from "@/utils/types/types";



// ---- TYPES ----//
type TableData =
  | ChartsOfAccountsProps<AccountingTableData>
  | ChartsOfAccountsProps<FunctionTableData>
  | ChartsOfAccountsProps<MuncipalityTableData>;
// ---- TYPES ----//

export const SubLedgure = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [searchCode, setSearchCode] = useState<string>("");

  const changeTab = (index: number) => {
    setSearchCode("");
    setTabIndex(index);
  }

  const fetchAllData = async <T extends TableData>(
    endpoint: string
  ): Promise<T> => {
    const res = await axios({
      url:
        `/${endpoint}` +
        `${searchCode && searchCode !== "" ? `?search=${searchCode}` : ""}`,
      method: "GET",
    });
    return res.data?.data as T;
  };

  const useCodeQuery = <T extends TableData>(endpoint: string) => {
    return useQuery([endpoint], () => fetchAllData<T>(endpoint));
  };

  //// ------------- Query Functions ----------------//
  // QUERYING ACCOUNTING CODE
  const {
    data: accountingCode,
    isError: accountingError,
    isLoading: accountingLoading,
    refetch: reloadAccountingCodeData,
  } = useCodeQuery<ChartsOfAccountsProps<AccountingTableData>>(
    "get-account-code"
  );

  // QUERYING FUNCTION CODE
  const {
    data: functionCode,
    isError: functionError,
    isLoading: functionLoading,
    refetch: reloadFunctionCodeData,
  } = useCodeQuery<ChartsOfAccountsProps<FunctionTableData>>(
    "get-all-fun-codes"
  );

  // QUERYING MUNCIPALITY CODE
  const {
    data: muncipalityCode,
    isError: muncipalityError,
    isLoading: muncipalityLoading,
    refetch: reloadMunicipalityCodeData,
  } = useCodeQuery<ChartsOfAccountsProps<MuncipalityTableData>>(
    "get-munci-code"
  );
  //// ------------- Query Functions ----------------//

  if (accountingError || muncipalityError || functionError) {
    console.log(accountingError);
    throw new Error("something went wrong");
  }

  ///// ----------------- Search Codes -----------------//
  const onSearchTextChange = (text: string) => {
    console.log(text);
    setSearchCode(text);
  };

  useEffect(() => {
    switch(tabIndex){
      case 1: reloadAccountingCodeData(); break;
      case 2: reloadFunctionCodeData(); break;
      case 3: reloadMunicipalityCodeData(); break;
    }
  }, [searchCode, tabIndex]);


  return (
    <>
      <section>
        <SubHeading className="text-2xl">Chart of Accounts</SubHeading>

        <div className="flex items-center gap-12 mt-5 text-secondary">
          <div className="flex-all-center ">
            <input
              id="accounting"
              type="radio"
              onChange={() => changeTab(1)}
              name="radio-1"
              className="radio border border-zinc-600"
              defaultChecked
            />
            <label htmlFor="accounting" className=" cursor-pointer">
              Primary Accounting Codes
            </label>
          </div>

          <div className="flex-all-center ">
            <input
              id="function"
              onChange={() => changeTab(2)}
              type="radio"
              name="radio-1"
              className="radio  border-zinc-600"
            />
            <label htmlFor="function" className=" cursor-pointer">
              Function Codes
            </label>
          </div>

          <div className="flex-all-center ">
            <input
              id="municipality"
              type="radio"
              onChange={() => changeTab(3)}
              name="radio-1"
              className="radio  border-zinc-600"
            />
            <label htmlFor="municipality" className=" cursor-pointer">
              Municipality Codes
            </label>
          </div>
        </div>
      </section>

      <section className="mt-8">
        {tabIndex === 1 ? (
          accountingLoading ? (
            <Loader />
          ) : (
            <PrimaryAccountingCode
              data={accountingCode || []}
              onSearchTextChange={onSearchTextChange}
            />
          )
        ) : tabIndex === 2 ? (
          functionLoading ? (
            <Loader />
          ) : (
            <FunctionCode
              data={functionCode || []}
              onSearchTextChange={onSearchTextChange}
            />
          )
        ) : muncipalityLoading ? (
          <Loader />
        ) : (
          <HeroMuncipalityCode
            data={muncipalityCode || []}
            onSearchTextChange={onSearchTextChange}
          />
        )}


      </section>
    </>
  );
};
