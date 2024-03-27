import Button from "@/components/global/atoms/Button";
import { fc } from "@/utils/helper";
import { AccountingTableData } from "@/utils/types/types";
import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import parse from 'html-react-parser';
import Loader from "../Basic/Loader";


interface AccoutingTableProps {
  data: AccountingTableData[];
  onViewButtonClick: (d: AccountingTableData) => void;
  searchCondition: RegExp | null;
  hideZeroBalances: boolean;
  handleHideZeroBalancesCheckbox: (checked: boolean) => void
}

const AccountingTable: React.FC<AccoutingTableProps> = (props) => {
  const [rows, setRows] = useState<ReactNode[] | null>(null);


  useEffect(() => {
    const rows = props.data?.map((d, index: number) => (
      <tr key={index} className={"border border-zinc-300 " + (
        !d ? "" :
          d.code_type == 1 ? "bg-primary_bg_indigo text-white bg-opacity-80" :
            d.code_type == 2 ? "bg-primary_bg_indigo bg-opacity-25 text-slate-950" : "text-secondary"
      )}>

        {/* MAJOR HEAD */}
        <td className="border border-l-2 border-zinc-300">
          <div className="flex justify-center">{d?.major_head[0]}</div>
        </td>
        <td className="border border-zinc-300">
          <div className="flex justify-center">{d?.major_head[1]}</div>
        </td>
        <td className="border border-zinc-300">
          <div className="flex justify-center">{d?.major_head[2]}</div>
        </td>

        {/* MAJOR HEAD */}

        {/* MINOR HEAD */}
        <td className="border-l-2 border border-zinc-300">
          <div className="flex justify-center">{d?.minor_head[0]}</div>
        </td>
        <td className="border-r-2 border-zinc-300">
          <div className="flex justify-center">{d?.minor_head[1]}</div>
        </td>
        {/* MINOR HEAD */}

        {/* DETAILS HEAD */}
        <td className="border border-zinc-300">
          <div className="flex justify-center">{d?.detail_code[0]}</div>
        </td>
        <td className="border-r-2 border-zinc-300">
          <div className="flex justify-center">{d?.detail_code[1]}</div>
        </td>
        {/* DETAILS HEAD */}

        {/* DESCRIPTION */}

        <td className="border border-zinc-300 ">{props.searchCondition ? parse(d?.description.replaceAll(props.searchCondition, '<span className="bg-[#FFCD00] text-white">$1</span>')) : d?.description}</td>
        {/* DESCRIPTION */}

        <td className="border border-zinc-300 ">{fc(d?.balance < 0 ? -d.balance : 0)}</td>
        <td className="border border-zinc-300 ">{fc(d?.balance >= 0 ? d.balance : 0)}</td>
        <td className="border border-zinc-300">
          <Button variant="primary" onClick={() => props.onViewButtonClick(d)}>View</Button>
        </td>

      </tr>
    ));
    setRows(rows);
  }, [props.searchCondition, props.data]);


  const handleHideZeroBalancesCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.handleHideZeroBalancesCheckbox(e.target.checked);
  }

  return (
    <>
      {!rows && (<Loader />)}

      {rows && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

          <div className="hide-scrollbar overflow-x-auto h-[550px] overflow-y-auto">
            <table className="table table-md">
              <thead className=" text-white text-[1rem] sticky top-0">
                <tr className="bg-white text-center" >
                  <th colSpan={11} className=" text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray ">
                    <div className="flex items-center pl-4 bg-primary_bg_gray">
                      <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={handleHideZeroBalancesCheckbox} checked={props.hideZeroBalances}/>
                      <label htmlFor="default-checkbox" className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300">Hide zero balances</label>
                    </div>

                  </th>
                </tr>
                <tr className="bg-white text-center">
                  <th
                    className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray"
                    colSpan={3}
                  >
                    <div className="text-center bg-primary_bg_gray p-4">
                      Major Head
                    </div>
                  </th>
                  <th
                    className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray"
                    colSpan={2}
                  >
                    <div className="text-center bg-primary_bg_gray p-4">
                      <span>Minor Head</span>
                    </div>
                  </th>

                  <th
                    className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray"
                    colSpan={2}
                  >
                    <div className="text-center bg-primary_bg_gray p-4">
                      <span>Detail Head</span>
                    </div>
                  </th>

                  <th className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray w-[35%]" rowSpan={2}>
                    <div className="text-center bg-primary_bg_gray p-4">
                      <span>Descriptions</span>
                    </div>
                  </th>

                  <th className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray" colSpan={2}>
                    <div className="text-center bg-primary_bg_gray p-4">
                      <span>Balances</span>
                    </div>

                    <div className="text-center bg-primary_bg_gray p-4 flex justify-between">
                      <div className="ml-8">DR</div>
                      <div className="mr-8">CR</div>
                    </div>

                  </th>
                  <th className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray" rowSpan={2}>
                    <div className="text-center bg-primary_bg_gray p-4">
                      <span>Action</span>
                    </div>
                  </th>
                </tr>

              </thead>
              <tbody className="static">
                {rows ? rows : (<></>)}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

    </>
  );
};

export default AccountingTable;
