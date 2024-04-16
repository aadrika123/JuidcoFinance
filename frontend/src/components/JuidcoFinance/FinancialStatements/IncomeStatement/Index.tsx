/**
 * Author: Bijoy Paitandi
 * date: 15-03-2024
 * status: Done
 */

"use client";

import React, { useEffect, useState } from "react";
import Select from "@/components/global/atoms/nonFormik/Select";
import axios from "@/lib/axiosConfig";
import { FINANCE_URL } from "@/utils/api/urls";
import { useQuery } from "react-query";
import IncomeStatementHeaderComponent from "./TrialBalanceHeaderComponent";
import Loader from "@/components/global/atoms/Loader";



interface IncomeStatementData {
  income: any[]
  expenditure: any[],
}


export const IncomeStatementComponent = () => {

  const [ulbID, setUlbID] = useState<number>(0);
  const [finYear, setFinYear] = useState<number>(0);
  const [ulbName, setUlbName] = useState<string>("");


  const fetchData = async (): Promise<IncomeStatementData> => {
    const res = await axios({
      url: "/balance-trackings/get-income-statement",
      method: "GET",
      params: { ulb: ulbID, year: finYear }
    });

    console.log(res.data?.data);

    return res.data?.data;
  }

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


  const {
    data: ItemData,
    isError: dataError,
    isLoading: isLoading,
  } = useQuery([finYear, ulbID], fetchData);

  if (dataError) {
    console.log(dataError);
    throw new Error("Fatal Error!");
  }

  useEffect(() => {

  }, []);

  let totalIncome = 0;
  if (ItemData) {
    if (ItemData.income) {
      ItemData.income.forEach((item) => {
        totalIncome += item.total_balance;
      });
    }
  }

  let totalExpenditure = 0;
  if(ItemData){
    if(ItemData.expenditure){
      ItemData.expenditure.forEach((item) => {
        totalExpenditure += item.total_balance;
      });
    }
  }


  return (
    <>
      <IncomeStatementHeaderComponent />
      <section className="border bg-white shadow-2xl p-6 px-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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

        </div>

        <div className="text-black mt-4">
          <table
            width="100%"
            className="border-collapse border border-slate-400"
          >
            <thead>
              <tr>
                <th className="border border-slate-300">Code No</th>
                <th className="border border-slate-300">Item/Head of Account</th>
                <th className="border border-slate-300">Schedule No</th>
                <th className="border border-slate-300">Current Year</th>
                <th className="border border-slate-300">Prev Year</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? <tr><td colSpan={4}><Loader /></td></tr> : (

                <>
                <tr>
                  <td className="border border-slate-300 px-4"></td>
                  <td className="border border-slate-300 px-4 font-bold">Income</td>
                </tr>
                {ItemData?.income?.map((item, index) => {
                  return (<tr key={`item${index}`}>
                    <td className="border border-slate-300 px-4">
                      {item.code.substring(0, 3)}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {item.description}
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>

                    <td className="border border-slate-300 px-4">
                      {item.total_balance}
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>
                  </tr>);
                })}
                <tr>
                    <td className="border border-slate-300 px-4 font-bold">
                      A
                    </td>
                    <td className="border border-slate-300 px-4 font-bold">
                      TOTAL INCOME
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>

                    <td className="border border-slate-300 px-4">
                      {totalIncome}
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>
                  </tr>


                  <tr>
                  <td className="border border-slate-300 px-4"></td>
                  <td className="border border-slate-300 px-4 font-bold">Expenditure</td>
                </tr>
                {ItemData?.expenditure?.map((item, index) => {
                  return (<tr key={`item${index}`}>
                    <td className="border border-slate-300 px-4">
                      {item.code.substring(0, 3)}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {item.description}
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>

                    <td className="border border-slate-300 px-4">
                      {item.total_balance}
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>
                  </tr>);
                })}
                <tr>
                    <td className="border border-slate-300 px-4 font-bold">
                      B
                    </td>
                    <td className="border border-slate-300 px-4 font-bold">
                      TOTAL EXPENDITURE
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>

                    <td className="border border-slate-300 px-4">
                      {totalExpenditure}
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-slate-300 px-4">
                      A-B
                    </td>
                    <td className="border border-slate-300 px-4 italic">
                      Gross Surplus/(deficit) of income over expenditure before Prior Period Items
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>

                    <td className="border border-slate-300 px-4">
                      {totalExpenditure}
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>
                  </tr>


                  <tr>
                    <td className="border border-slate-300 px-4">
                      2-80
                    </td>
                    <td className="border border-slate-300 px-4 italic">
                      Add: Prior Period Items (Net)
                    </td>
                    <td className="border border-slate-300 px-4">
                    1-18
                    </td>
                      
                    <td className="border border-slate-300 px-4">
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>
                  </tr>


                  <tr>
                    <td className="border border-slate-300 px-4">
                      
                    </td>
                    <td className="border border-slate-300 px-4 italic">
                      Gross Surplus/(deficit) of income over expenditure after Prior Period Items
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>

                    <td className="border border-slate-300 px-4">
                      
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>
                  </tr>


                  <tr>
                    <td className="border border-slate-300 px-4">
                      2-90
                    </td>
                    <td className="border border-slate-300 px-4">
                      Less: Transfer to Reserve Funds
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>
                      
                    <td className="border border-slate-300 px-4">
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-slate-300 px-4">
                    </td>
                    <td className="border border-slate-300 px-4 font-bold">
                    Net Balance Being Surplus/Deficit carried over to Municipal Fund

                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>
                      
                    <td className="border border-slate-300 px-4">
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>
                  </tr>

                </>

              )}

            </tbody>

          </table>

        </div>

      </section>
    </>
  );
};