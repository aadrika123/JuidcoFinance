"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import BalanceSheetHeaderComponent from "./BalanceSheetHeaderComponent";
import Select from "@/components/global/atoms/nonFormik/Select";
import { FINANCE_URL } from "@/utils/api/urls";
import Loader from "@/components/global/atoms/Loader";


/**
 * Author: Bijoy Paitandi
 * date: 15-03-2024
 * status: Done
 */

const reserveAndSurplusSchedules = ['B-1', 'B-2', 'B-3'];
const liabilitiesAndProvisionsSchedules = ['B-7', 'B-8', 'B-9', 'B-10'];



interface AccountData {
    code: string;
    description: string;
    total_balance: number;
    schedule_ref_no: string;
}

interface BalanceSheetData {
    selectedYear: AccountData[],
    prevYear: AccountData[],
}


interface ProcessedData {
    reserveAndSurplus: AccountData[],
    liabilitiesAndProvisions: AccountData[],
}


const processData = (data: AccountData[]): ProcessedData => {
    const reserveAndSurplus: any = [];
    const liabilitiesAndProvisions: any = [];

    data.forEach((item: AccountData) => {
        if (reserveAndSurplusSchedules.includes(item.schedule_ref_no)) {
            reserveAndSurplus.push(item);
        } else if (liabilitiesAndProvisionsSchedules.includes(item.schedule_ref_no)) {
            liabilitiesAndProvisions.push(item);
        }
    });


    return {
        reserveAndSurplus: reserveAndSurplus,
        liabilitiesAndProvisions: liabilitiesAndProvisions
    };

}


export const BalanceSheetComponent = () => {
    const [selectedYearData, setSelectedYearData] = useState<ProcessedData>();


    const [ulbID, setUlbID] = useState<number>(0);
    const [finYear, setFinYear] = useState<number>(0);


    const fetchData = async (): Promise<BalanceSheetData> => {
        const res = await axios({
            url: "/balance-trackings/get-balance-sheet",
            method: "GET",
            params: { ulb: ulbID, year: finYear }
        });

        console.log(res.data?.data);

        return res.data?.data;
    }


    const setUlb = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const ele = event.target;
        setUlbID(parseInt(ele.value));
    }


    const finYearInitHandler = (value: number) => {
        setFinYear(value);
    }

    const ulbInitHandler = (value: number) => {
        setUlbID(value);
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
        if (ItemData?.selectedYear) setSelectedYearData(processData(ItemData.selectedYear));
    }, [ItemData]);

    return (
        <>
            <BalanceSheetHeaderComponent />
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
                                <th className="border border-slate-300">Description of Items</th>
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
                                        <td className="border border-slate-300 px-4 font-bold">Reserve & Surplus</td>
                                    </tr>
                                    {selectedYearData?.reserveAndSurplus.map((item, index) => {
                                        return (
                                            <tr key={`item${index}`}>
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


                                                </td>
                                            </tr>
                                        );
                                    })}



                                    <tr>
                                        <td className="border border-slate-300 px-4"></td>
                                        <td className="border border-slate-300 px-4 font-bold">Total Loans, Current Liabilities and Provisions</td>
                                    </tr>
                                    {selectedYearData?.liabilitiesAndProvisions.map((item, index) => {
                                        return (
                                            <tr key={`item${index}`}>
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


                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            )}
                        </tbody>

                    </table>
                </div>
            </section>

        </>
    );
}