"use client";
// ------------------------- CHART OF ACCOUNTS ----------------------- //

import React, { lazy, useState } from "react";
import { SubHeading } from "../Helpers/Heading";
import HeroMuncipalityCode from "./MunicipalityCode/HeroMuncipalityCode";
const PrimaryAccountingCode = lazy(
  () => import("./AccountingCode/HeroAccountingCode")
);
import axios from "@/lib/axiosConfig";
import FunctionCode from "./FunctionCode/HeroFunctionCode";
import { useQuery } from "react-query";
import Loader from "../Helpers/Basic/Loader";
import type {
  AccountingTableData,
  FunctionTableData,
  MuncipalityTableData,
} from "@/utils/types/types";
// ---- TYPES ----//

type TableData =
  | AccountingTableData[]
  | FunctionTableData[]
  | MuncipalityTableData[];
// ---- TYPES ----//

export const SubLedgure = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [muncipalPage, setMuncipalPage] = useState<number>(1);
  const [accountingPage, setAccoutingPage] = useState<number>(1);
  const [functionPage, setFunctionPage] = useState<number>(1);

  const handlePageChangeAccounting = (direction: "prev" | "next") => {
    setAccoutingPage((prevPage) =>
      direction === "prev" ? prevPage - 1 : prevPage + 1
    );
  };

  const handlePageChangeFunctionCode = (direction: "prev" | "next") => {
    setFunctionPage((prevPage) =>
      direction === "prev" ? prevPage - 1 : prevPage + 1
    );
  };
  const handlePageChangeMuncipality = (direction: "prev" | "next") => {
    setMuncipalPage((prevPage) =>
      direction === "prev" ? prevPage - 1 : prevPage + 1
    );
  };

  const fetchAllData = async <T extends TableData>(
    endpoint: string,
    page: number = 1
  ): Promise<T> => {
    const res = await axios({
      url: `/api/finance/${endpoint}?limit=10&page=${page}`,
      method: "GET",
    });

    return res.data?.data?.data as T;
  };

  const useCodeQuery = <T extends TableData>(
    endpoint: string,
    page: number = 1
  ) => {
    return useQuery([endpoint, page], () => fetchAllData<T>(endpoint, page));
  };

  //// ------------- Query Functions ----------------//
  // QUERYING ACCOUNTING CODE
  const {
    data: accountingCode,
    isError: accountingError,
    isLoading: accountingLoading,
  } = useCodeQuery<AccountingTableData[]>("account-codes", accountingPage);

  // QUERYING FUNCTION CODE
  const {
    data: functionCode,
    isError: functionError,
    isLoading: functionLoading,
  } = useCodeQuery<FunctionTableData[]>("function-codes", functionPage);

  // QUERYING MUNCIPALITY CODE
  const {
    data: muncipalityCode,
    isError: muncipalityError,
    isLoading: muncipalityLoading,
  } = useCodeQuery<MuncipalityTableData[]>("municipality-codes", muncipalPage);
  //// ------------- Query Functions ----------------//

  if (accountingError || muncipalityError || functionError) {
    console.log(accountingError);
    throw new Error("something went wrong");
  }

  return (
    <>
      <section>
        <SubHeading className="text-2xl">Chart of Accounts</SubHeading>

        <div className="flex items-center gap-12 mt-5 text-secondary">
          <div className="flex-all-center ">
            <input
              id="accounting"
              type="radio"
              onChange={() => setTabIndex(1)}
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
              onChange={() => setTabIndex(2)}
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
              onChange={() => setTabIndex(3)}
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
              nextPage={() => handlePageChangeAccounting("next")}
              prevPage={() => handlePageChangeAccounting("prev")}
              page={accountingPage}
            />
          )
        ) : tabIndex === 2 ? (
          functionLoading ? (
            <Loader />
          ) : (
            <FunctionCode
              data={functionCode || []}
              nextPage={() => handlePageChangeFunctionCode("next")}
              prevPage={() => handlePageChangeFunctionCode("prev")}
              page={functionPage}
            />
          )
        ) : muncipalityLoading ? (
          <Loader />
        ) : (
          <HeroMuncipalityCode
            data={muncipalityCode || []}
            nextPage={() => handlePageChangeMuncipality("next")}
            prevPage={() => handlePageChangeMuncipality("prev")}
            page={muncipalPage}
          />
        )}
      </section>
    </>
  );
};
