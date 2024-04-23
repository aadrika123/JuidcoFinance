"use client";

import React, { useEffect, useState } from "react";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import BalanceSheetHeaderComponent from "./BalanceSheetHeaderComponent";
import Select from "@/components/global/atoms/nonFormik/Select";
import { FINANCE_URL } from "@/utils/api/urls";


/**
 * Author: Bijoy Paitandi
 * date: 15-03-2024
 * status: Done
 */


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



const processData = (data: AccountData[]): any => {
    const processedData: any = {};
    let b11Count=0;
    data?.forEach((item)=>{
        let key = item.schedule_ref_no.replace('-','');
        if(key == "B11"){
            key += String.fromCharCode(b11Count+97);
            b11Count ++;
        }
        processedData[key] = item;
    });

    console.log(processedData);
    return processedData;
}


export const BalanceSheetComponent = () => {
    const [selectedYearData, setSelectedYearData] = useState<any>();
    const [prevYearData, setPrevYearData] = useState<any>();


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
    } = useQuery([finYear, ulbID], fetchData);

    if (dataError) {
        console.log(dataError);
        throw new Error("Fatal Error!");
    }

    useEffect(() => {
        if (ItemData?.selectedYear) setSelectedYearData(processData(ItemData.selectedYear));
        if (ItemData?.prevYear) setPrevYearData(processData(ItemData.prevYear));
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
                            <tr>
                                <td></td>
                                <td className="px-4 border-x border-slate-300">LIABILITIES</td>
                                <td className="border-x border-slate-300"></td>
                                <td className="border-x border-slate-300"></td>

                            </tr>
                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B1?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B1?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B1?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B1?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B1?.total_balance}</td>
                            </tr>

                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B2?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B2?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B2?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B2?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B2?.total_balance}</td>
                            </tr>

                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B3?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B3?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B3?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B3?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B3?.total_balance}</td>
                            </tr>
                            <tr>
                                <td className="border border-slate-300 px-4"></td>
                                <td className="border border-slate-300 px-4">Total reserves & surplus</td>
                                <td className="border border-slate-300 px-4"></td>
                                <td className="border border-slate-300 px-4"></td>
                                <td className="border border-slate-300 px-4"></td>
                            </tr>

                            <tr>
                                <td className="px-4 border border-slate-300">{selectedYearData?.B4?.code.substring(0,3)}</td>
                                <td className="px-4 border border-slate-300">{selectedYearData?.B4?.description}</td>
                                <td className="px-4 border border-slate-300">{selectedYearData?.B4?.schedule_ref_no}</td>
                                <td className="px-4 border border-slate-300">{selectedYearData?.B4?.total_balance}</td>
                                <td className="px-4 border border-slate-300">{prevYearData?.B4?.total_balance}</td>
                            </tr>

                            <tr>
                                <td></td>
                                <td className="px-4 border-x border-slate-300">Total Loans</td>
                                <td className="border-x border-slate-300"></td>
                                <td className="border-x border-slate-300"></td>

                            </tr>

                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B7?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B7?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B7?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B7?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B7?.total_balance}</td>
                            </tr>

                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B8?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B8?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B8?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B8?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B8?.total_balance}</td>
                            </tr>

                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B9?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B9?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B9?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B9?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B9?.total_balance}</td>
                            </tr>

                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B10?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B10?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B10?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B10?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B10?.total_balance}</td>
                            </tr>


                            <tr>
                                <td className="border border-slate-300 px-4"></td>
                                <td className="border border-slate-300 px-4">Total Current Liabilities and Provisions</td>
                                <td className="border border-slate-300 px-4"></td>
                                <td className="border border-slate-300 px-4"></td>
                                <td className="border border-slate-300 px-4"></td>
                            </tr>

                            <tr>
                                <td className="border border-slate-300 px-4"></td>
                                <td className="border border-slate-300 px-4">Total Liabilities</td>
                                <td className="border border-slate-300 px-4"></td>
                                <td className="border border-slate-300 px-4"></td>
                                <td className="border border-slate-300 px-4"></td>
                            </tr>


                            <tr>
                                <td></td>
                                <td className="px-4 border-x border-slate-300">ASSETS</td>
                                <td className="border-x border-slate-300"></td>
                                <td className="border-x border-slate-300"></td>

                            </tr>
                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B11a?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B11a?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B11a?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B11a?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B11a?.total_balance}</td>
                            </tr>

                            <tr>
                                <td className="px-4 border-x border-slate-300"></td>
                                <td className="px-4 border-x border-slate-300">Gross Block</td>
                                <td className="px-4 border-x border-slate-300"></td>
                                <td className="px-4 border-x border-slate-300"></td>
                                <td className="px-4 border-x border-slate-300"></td>
                            </tr>

                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B12?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B12?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B12?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B12?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B12?.total_balance}</td>
                            </tr>

                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B13?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B13?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B13?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B13?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B13?.total_balance}</td>
                            </tr>

                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B14?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B14?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B14?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B14?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B14?.total_balance}</td>
                            </tr>

                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B15?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B15?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B15?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B15?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B15?.total_balance}</td>
                            </tr>

                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B16?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B16?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B16?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B16?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B16?.total_balance}</td>
                            </tr>
                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B17?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B17?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B17?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B17?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B17?.total_balance}</td>
                            </tr>
                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B18?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B18?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B18?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B18?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B18?.total_balance}</td>
                            </tr>
                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B19?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B19?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B19?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B19?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B19?.total_balance}</td>
                            </tr>
                            <tr>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B20?.code.substring(0,3)}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B20?.description}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B20?.schedule_ref_no}</td>
                                <td className="px-4 border-x border-slate-300">{selectedYearData?.B20?.total_balance}</td>
                                <td className="px-4 border-x border-slate-300">{prevYearData?.B20?.total_balance}</td>
                            </tr>

                            <tr className="font-bold">
                                <td className="border border-slate-300 px-4"></td>
                                <td className="border border-slate-300 px-4">Total Assets</td>
                                <td className="border border-slate-300 px-4"></td>
                                <td className="border border-slate-300 px-4"></td>
                                <td className="border border-slate-300 px-4"></td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </section>

        </>
    );
}