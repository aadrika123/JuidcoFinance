import Button from "@/components/global/atoms/Button";
import { AccountingTableData } from "@/utils/types/types";
import React from "react";

interface AccoutingTableProps {
  data: AccountingTableData[];
  onViewButtonClick: (d: AccountingTableData) => void;
}

const AccountingTable: React.FC<AccoutingTableProps> = (props) => {

  return (
    <>
      <div className="hide-scrollbar overflow-x-auto h-[550px] overflow-y-auto">
        <table className="table table-md">
          <thead className=" text-white text-[1rem] sticky top-0">
            <tr className="bg-white text-center">
              <th
                className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray"
                colSpan={3} rowSpan={2}
              >
                <div className="text-center bg-primary_bg_gray p-4">
                  Major Head
                </div>
              </th>
              <th
                className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray"
                colSpan={2} rowSpan={2}
              >
                <div className="text-center bg-primary_bg_gray p-4">                
                  <span>Minor Head</span>
                </div>
              </th>

              <th
                className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray"
                colSpan={2} rowSpan={2}
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
              </th>
              <th className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray" rowSpan={2}>
              <div className="text-center bg-primary_bg_gray p-4">
                  <span>Action</span>
                </div>
              </th>
            </tr>
            <tr>
              <th className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray">
              <div className="text-center bg-primary_bg_gray p-4">
                  <span>DR (₹)</span>
                </div>
              </th>
              <th className="border text-secondary_black border-zinc-400 font-medium p-0 bg-primary_bg_gray">
              <div className="text-center bg-primary_bg_gray p-4">
                  <span>CR (₹)</span>
                </div>
              </th>
           </tr>
          </thead>
          <tbody className="">
            {props.data?.map((d, index: number) => (
              
              <tr key={index} className={"border border-zinc-300 " + (
                !d ? "":
                d.code_type == 1? "bg-primary_bg_indigo text-white bg-opacity-80":
                d.code_type == 2 ? "bg-primary_bg_indigo bg-opacity-25 text-slate-950": "text-secondary"
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
                <td className="border border-zinc-300 ">{d?.description}</td>
                {/* DESCRIPTION */}

                <td className="border border-zinc-300 ">{d?.balance < 0 ? -d.balance:0}</td>
                <td className="border border-zinc-300 ">{d?.balance >= 0 ? d.balance:0}</td>
                <td className="border border-zinc-300">
                  <Button variant="primary" onClick={() => props.onViewButtonClick(d)}>View</Button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AccountingTable;
