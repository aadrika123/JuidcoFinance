import React from "react";
import { AccountingTableData } from "../types";

interface AccoutingTableProps {
  data: AccountingTableData[];
}

const AccountingTable: React.FC<AccoutingTableProps> = (props) => {
  return (
    <>
      <div className="hide-scrollbar overflow-x-auto h-[550px] overflow-y-auto border">
        <table className="table table-md">
          <thead className=" text-white text-[1rem] border ">
            <tr className="bg-white sticky top-0 text-center border-b border-t-2 border-zinc-400">
              <th
                className="border text-secondary_black border-zinc-400 font-medium p-0"
                colSpan={3}
              >
                <div className="text-center bg-primary_bg_gray p-4">
                  Major Head
                </div>
              </th>
              <th
                className="border text-secondary_black border-zinc-400 font-medium p-0"
                colSpan={2}
              >
                <div className="text-center bg-primary_bg_gray p-4">                
                  <span>Minor Head</span>
                </div>
              </th>

              <th
                className="border text-secondary_black border-zinc-400 font-medium p-0"
                colSpan={2}
              >
                <div className="text-center bg-primary_bg_gray p-4">
                  <span>Detail Head</span>
                </div>
              </th>

              <th className="border text-secondary_black border-zinc-400 font-medium p-0">
              <div className="text-center bg-primary_bg_gray p-4">
                  <span>Descriptions</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {props.data?.map((d, index: number) => (
              <tr key={index} className="border border-zinc-300 text-secondary">
                {/* MAJOR HEAD */}
                <td className="border border-l-2 border-zinc-300 w-[6.5%]">
                  <div className="flex justify-center">{d?.major_head[0]}</div>
                </td>
                <td className="border border-zinc-300 w-[6.5%]">
                  <div className="flex justify-center">{d?.major_head[1]}</div>
                </td>
                <td className="border border-zinc-300 w-[6.5%]">
                  <div className="flex justify-center">{d?.major_head[2]}</div>
                </td>

                {/* MAJOR HEAD */}

                {/* MINOR HEAD */}
                <td className="border-l-2 border border-zinc-300 w-[7.5%]">
                  <div className="flex justify-center">{d?.minor_head[0]}</div>
                </td>
                <td className="border-r-2 border-zinc-300 w-[7.5%]">
                  <div className="flex justify-center">{d?.minor_head[1]}</div>
                </td>
                {/* MINOR HEAD */}

                {/* DETAILS HEAD */}
                <td className="border border-zinc-300 w-[7.5%]">
                  <div className="flex justify-center">{d?.detail_code[0]}</div>
                </td>
                <td className="border-r-2 border-zinc-300 w-[7.5%]">
                  <div className="flex justify-center">{d?.detail_code[1]}</div>
                </td>
                {/* DETAILS HEAD */}

                {/* DESCRIPTION */}
                <td className="border border-zinc-300 ">{d?.description}</td>
                {/* DESCRIPTION */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AccountingTable;
