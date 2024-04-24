/**
 * Author: Bijoy Paitandi
 * date: 15-03-2024
 * status: Done
 */

"use client";

import React, {useEffect, useRef, useState } from "react";
import Select from "@/components/global/atoms/nonFormik/Select";
import axios from "@/lib/axiosConfig";
import { FINANCE_URL } from "@/utils/api/urls";
import { useQuery } from "react-query";
import Loader from "@/components/global/atoms/Loader";
import TrialBalanceHeaderComponent from "./TrialBalanceHeaderComponent";
import { usePathname } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import {fc} from "jflib";





export const TrialBalanceComponent = () => {
  const pathName = usePathname();

  const [ulbID, setUlbID] = useState<number>(0);
  const [finYear, setFinYear] = useState<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [totalTrialBalance, setTotalTrialBalance] = useState<number>(-1);


  const printableComponentRef = useRef(null);
    const printIt = useReactToPrint({
      content: () => printableComponentRef.current,
    });
  

  const fetchData = async (): Promise<any[]> => {

    setIsLoading(true);

    if(ulbID == 0 || finYear == 0)
      return [];

    const res = await axios({
      url: "/balance-trackings/get-trial-balance",
      method: "GET",
      params: { ulb: ulbID, year: finYear }
    });

    console.log(res.data?.data);
    return res.data?.data;
  }

  const setUlb = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    const ele = event.target;
    setUlbID(parseInt(ele.value));
  }


  const finYearInitHandler = (value: number) => {
    setIsLoading(true);
    setFinYear(value);
  }

  const ulbInitHandler = (value: number) => {
    setIsLoading(true);
    setUlbID(value);
  }


  const {
    data: ItemData = [],
    isError: dataError,
  } = useQuery([finYear, ulbID, pathName], fetchData, {cacheTime: 0});

  if (dataError) {
    console.log(dataError);
    throw new Error("Fatal Error!");
  }


  useEffect(() => {
    if(ItemData != null && ItemData.length != 0){
      let totalDebit = 0;
      let totalCredit = 0;
      ItemData.forEach((item)=>{
        totalDebit += item.debit_balance;
        totalCredit += item.credit_balance;
      });
      setTotalTrialBalance(totalCredit - totalDebit);
      setIsLoading(false);
    }
  }, [ItemData, pathName]);

  return (
    <>
      <TrialBalanceHeaderComponent onPrintButtonClick={printIt} />
      <div ref={printableComponentRef}>

      <section className="border bg-white shadow-2xl p-6 px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
          <div className="text-primary_bg_indigo rounded-md px-2 pb-1 text-sub_head font-semibold flex items-center">

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

            <div className="text-primary_bg_indigo rounded-md px-2 pb-1 text-sub_head font-semibold flex items-center">
              <Select
                label=""
                name="ulb_id"
                className="w-56 border-[#4338ca] text-primary_bg_indigo"
                api={`${FINANCE_URL.MUNICIPILATY_CODE_URL.get}`}
                onChange={setUlb}
                value={ulbID}
                initHandler={ulbInitHandler}
              />
            </div>


          </div>

        </div>


        <div className="text-black mt-4">
        {isLoading ? <Loader /> : (
          <table
            width="100%"
            className="border-collapse border border-slate-400"
          >
            <thead>
              <tr>
                <th className="border border-slate-300">Code No</th>
                <th className="border border-slate-300">Particulars</th>
                <th className="border border-slate-300">Debit</th>
                <th className="border border-slate-300">Credit</th>
              </tr>
            </thead>

            <tbody>

                {ItemData.length && ItemData?.map((item, index) => {
                  return (<tr key={`schedule${index}`}>
                    <td className="border border-slate-300 px-4">
                      {item.code.substring(0,3)}
                    </td> 
                    <td className="border border-slate-300 px-4">
                    {item.description}
                    </td>
                    <td className="border border-slate-300 px-4">
                    {fc(item.debit_balance)}
                    </td>
                    <td className="border border-slate-300 px-4">
                    {fc(item.credit_balance)}
                    </td>
                    </tr>);
                })}

                <tr className="border border-slate-300 px-4 font-bold">
                  <td className="border border-slate-300 px-4"></td>
                  <td className="border border-slate-300 px-4">Trial Balance</td>
                  <td colSpan={4} className="border border-slate-300 px-4">{fc(totalTrialBalance)}</td>
                </tr>
              

            </tbody>

          </table>)}


        </div>

      </section>
      </div>
    </>
  );
};