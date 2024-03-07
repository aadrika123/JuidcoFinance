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
import Button from "@/components/global/atoms/Button";
import PopupFormikHOC from "@/components/HOC/PopupFormikHOC";
import { useDispatch } from "react-redux";
import { closePopup, openPopup } from "@/redux/reducers/PopupReducers";
import RequestNewAccountCode from "./RequestNewAccountCode";
import { RequestAccCodesDetailsSchema } from "@/utils/validation/masters/request_accounting_codes.validation";
import { PrimaryAccCodes } from "@/utils/types/primary_accounting_codes";
import Popup from "@/components/global/molecules/Popup";
import SuccesfullConfirm from "@/components/global/molecules/SuccesfullConfirm";
import { FINANCE_URL } from "@/utils/api/urls";
import { filterValBefStoring } from "@/utils/helper";
import toast, { Toaster } from "react-hot-toast";

// ---- TYPES ----//
type TableData =
  | ChartsOfAccountsProps<AccountingTableData>
  | ChartsOfAccountsProps<FunctionTableData>
  | ChartsOfAccountsProps<MuncipalityTableData>;
// ---- TYPES ----//

export const SubLedgure = () => {
  const [tabIndex, setTabIndex] = useState<number>(1);
  const [searchCode, setSearchCode] = useState<string>("");
  const dispatch = useDispatch();

  const changeTab = (index: number) => {
    setSearchCode("");
    setTabIndex(index);
  };

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
    setSearchCode(text);
  };

  //// -------------- handleOpenPopup ------------//
  const handleOpenPopup = () => {
    dispatch(openPopup());
  };

  const HOC = PopupFormikHOC(RequestNewAccountCode);

///////// Initializing Values ///////////////
  const initialValues = {
    ulb_id: "",
    request_no: "",
    employee_id: "",
    date: "",
    group_ref: "",
    code_ref: "",
    description: "",
  };

  ///////// Hadle Submit Function ///////////////
  const onSubmit = async (values: PrimaryAccCodes) => {
    try{
      const res = await axios({
        url: FINANCE_URL.ACCOUNTING_CODE_URL.create,
        method: "POST",
        data: filterValBefStoring(values),
      });
      if (res.data?.data) {
        setIsOpen(!isOpen);
        dispatch(closePopup());
      }
    }catch(error){
      toast.error('Something Went Wrong!!!')
      console.log(error)
    }
  };

  ///////////// Handle Open Popup ///////////
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    switch (tabIndex) {
      case 1:
        reloadAccountingCodeData();
        break;
      case 2:
        reloadFunctionCodeData();
        break;
      case 3:
        reloadMunicipalityCodeData();
        break;
    }
  }, [searchCode, tabIndex]);

  return (
    <>
    <Toaster/>
      {isOpen && (
        <Popup title="" width="40%" bgColor="primary_bg">
          <SuccesfullConfirm
            message="Your Request Sent Successfully"
            handleContinueButton={onClose}
          />
        </Popup>
      )}
      <HOC
        initialValues={initialValues}
        validationSchema={RequestAccCodesDetailsSchema}
        onSubmit={onSubmit}
      />
      <section>
        <div className="flex items-center justify-between">
          <SubHeading className="text-2xl">Chart of Accounts</SubHeading>
          {tabIndex === 1 && (
            <Button variant="primary" onClick={handleOpenPopup}>
              Request A New Primary Accounting Code
            </Button>
          )}
        </div>

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
              data={Array.isArray(accountingCode) ? accountingCode : []}
              onSearchTextChange={onSearchTextChange}
            />
          )
        ) : tabIndex === 2 ? (
          functionLoading ? (
            <Loader />
          ) : (
            <FunctionCode
              data={Array.isArray(functionCode) ? functionCode : []}
              onSearchTextChange={onSearchTextChange}
            />
          )
        ) : muncipalityLoading ? (
          <Loader />
        ) : (
          <HeroMuncipalityCode
            data={Array.isArray(muncipalityCode) ? muncipalityCode : []}
            onSearchTextChange={onSearchTextChange}
          />
        )}
      </section>
    </>
  );
};
