"use client";

import React, { useEffect, useState } from "react";
import Select from "@/components/global/atoms/nonFormik/Select";
import axios from "@/lib/axiosConfig";
import { FINANCE_URL } from "@/utils/api/urls";
import { useQuery } from "react-query";
import IncomeStatementHeaderComponent from "./TrialBalanceHeaderComponent";
import Loader from "@/components/global/atoms/Loader";


/**
 * Author: Bijoy Paitandi
 * date: 15-03-2024
 * status: Done
 */


const incomeSchedules = ['I-1', 'I-2', 'I-3', 'I-4', 'I-5', 'I-6', 'I-7', 'I-8', 'I-9'];
const expenditureSchedules = ['I-10', 'I-11', 'I-12', 'I-13', 'I-14', 'I-15', 'I-16', 'I-17', 'I-19'];

interface AccountData {
  code: string;
  description: string;
  total_balance: number;
  schedule_ref_no: string;
}

interface IncomeStatementData {
  selectedYear: AccountData[],
  prevYear: AccountData[],
}


interface ProcessedData {
  incomes: AccountData[],
  expenditures: AccountData[],
  totalIncome: number,
  totalExpenditure: number,
  grossBeforePriorItems: number,
  grossAfterPriorItems: number,
  netBalance: number,
  i18Data: AccountData,
  i20Data: AccountData
}


const processData = (data: AccountData[]) : ProcessedData => {
  const incomes: any = [];
  let totalIncome = 0;
  const expenditures: any = [];
  let i18Data: any;
  let i20Data: any;
  let totalExpenditure = 0;

  data.forEach((item: AccountData) => {
    if(incomeSchedules.includes(item.schedule_ref_no)){
      incomes.push(item);
      totalIncome += item?.total_balance;
    }
    else if(expenditureSchedules.includes(item.schedule_ref_no)){
      expenditures.push(item);
      totalExpenditure += item?.total_balance;
    }else if('I-18' == item.schedule_ref_no){
      i18Data = item;
    }else if('I-20' == item.schedule_ref_no){
      i20Data = item;
    }
  });


  return {
    incomes: incomes,
    expenditures: expenditures,
    totalIncome: totalIncome,
    totalExpenditure: totalExpenditure,
    grossBeforePriorItems: totalIncome - totalExpenditure,
    grossAfterPriorItems: totalIncome - totalExpenditure + i18Data.total_balance,
    netBalance: totalIncome - totalExpenditure + i18Data.total_balance - i20Data.total_balance,
    i18Data: i18Data,
    i20Data: i20Data
  };

}


export const IncomeStatementComponent = () => {
  const [selectedYearData, setSelectedYearData] = useState<ProcessedData>();
  const [prevYearData, setPrevYearData] = useState<ProcessedData>();

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
    if(ItemData?.selectedYear) setSelectedYearData(processData(ItemData.selectedYear));
    if(ItemData?.prevYear) setPrevYearData(processData(ItemData.prevYear));
  }, [ItemData]);

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
                {selectedYearData?.incomes?.map((item, index) => {
                  return (<tr key={`item${index}`}>
                    <td className="border border-slate-300 px-4">
                      {item.code.substring(0, 3)}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {item.description}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {item.schedule_ref_no}
                    </td>

                    <td className="border border-slate-300 px-4">
                      {item.total_balance}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {prevYearData?.incomes[index].total_balance}
                      
                    </td>
                  </tr>);
                })}
                <tr className="font-bold">
                    <td className="border border-slate-300 px-4">
                      A
                    </td>
                    <td className="border border-slate-300 px-4 font-bold">
                      TOTAL INCOME
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>

                    <td className="border border-slate-300 px-4">
                      {selectedYearData?.totalIncome}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {prevYearData?.totalIncome}
                    </td>
                  </tr>


                  <tr>
                  <td className="border border-slate-300 px-4"></td>
                  <td className="border border-slate-300 px-4 font-bold">Expenditure</td>
                </tr>
                {selectedYearData?.expenditures?.map((item, index) => {
                  return (<tr key={`item${index}`}>
                    <td className="border border-slate-300 px-4">
                      {item.code.substring(0, 3)}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {item.description}
                    </td>
                    <td className="border border-slate-300 px-4">
                    {item.schedule_ref_no}
                    </td>

                    <td className="border border-slate-300 px-4">
                      {item.total_balance}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {prevYearData?.expenditures[index].total_balance}
                    </td>
                  </tr>);
                })}
                <tr className="font-bold">
                    <td className="border border-slate-300 px-4">
                      B
                    </td>
                    <td className="border border-slate-300 px-4">
                      TOTAL EXPENDITURE
                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>

                    <td className="border border-slate-300 px-4">
                      {selectedYearData?.totalExpenditure}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {prevYearData?.totalExpenditure}
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
                    {selectedYearData?.grossBeforePriorItems}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {prevYearData?.grossBeforePriorItems}
                    </td>
                  </tr>


                  <tr>
                    <td className="border border-slate-300 px-4">
                    {selectedYearData?.i18Data?.code.substring(0, 3)}
                    </td>
                    <td className="border border-slate-300 px-4 italic">
                      Add: {selectedYearData?.i18Data?.description} (Net)
                    </td>
                    <td className="border border-slate-300 px-4">
                      {selectedYearData?.i18Data?.schedule_ref_no}
                    </td>
                      
                    <td className="border border-slate-300 px-4">
                      {selectedYearData?.i18Data?.total_balance}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {prevYearData?.i18Data?.total_balance}
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
                      {selectedYearData?.grossAfterPriorItems}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {prevYearData?.grossAfterPriorItems}
                    </td>
                  </tr>


                  <tr>
                    <td className="border border-slate-300 px-4">
                      {selectedYearData?.i20Data?.code.substring(0,3)}
                    </td>
                    <td className="border border-slate-300 px-4">
                      Less: {selectedYearData?.i20Data?.description}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {selectedYearData?.i20Data?.schedule_ref_no}
                    </td>
                      
                    <td className="border border-slate-300 px-4">
                      {selectedYearData?.i20Data?.total_balance}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {prevYearData?.netBalance}
                    </td>
                  </tr>

                  <tr className="font-bold">
                    <td className="border border-slate-300 px-4">
                    </td>
                    <td className="border border-slate-300 px-4">
                    Net Balance Being Surplus/Deficit carried over to Municipal Fund

                    </td>
                    <td className="border border-slate-300 px-4">
                    </td>
                      
                    <td className="border border-slate-300 px-4">
                      {selectedYearData?.netBalance}
                    </td>
                    <td className="border border-slate-300 px-4">
                      {prevYearData?.netBalance}
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