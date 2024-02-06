"use client";

import { RootState } from "@/redux/store";
import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

const SubLedgerTable: React.FC = () => {
//   const SubLedgerData = useSelector(
//     (state: RootState) => state.paymentDetails.paymentDetails
//   );

const SubLedgerData = [
    {
        id: 1,
        ledger_code: 1234,
        amount: 200
    }
]

  const pathName = usePathname();

  return (
    <>
      <div className="mt-8 overflow-x-auto border-[2px] border-zinc-400">
        <table className="table table-md">
          <thead className="  text-[1rem] bg-primary_green text-white border border-t-2 border-zinc-400 ">
            <tr>
              <th className="border border-zinc-400">
                <div className="flex gap-2 font-medium text-center">
                  <span>Sr No.</span>
                </div>
              </th>
              <th className="border border-zinc-400  font-medium">
                <div className="flex gap-2">
                  <span>Sub - Ledger Code</span>
                </div>
              </th>

              <th className="border border-zinc-400 font-medium">
                <div className="flex gap-2">
                  <span>Amount(₹)</span>
                </div>
              </th>

              <th colSpan={2} className="border  border-zinc-400  font-medium">
                  <span>Add/Remove</span>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {SubLedgerData?.map((d, index: number) => (
              <tr key={index} className="border border-zinc-400 text-secondary">
                {/* ID */}
                <td className="border border-zinc-400">{d?.id}</td>
                <td className="border border-zinc-400">{d?.ledger_code}</td>
                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">{d?.amount}</div>
                </td>

                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">
                    <div className="flex justify-center">
                      +
                    </div>
                  </div>
                </td>

                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">
                    <div className="flex justify-center">
                      -
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SubLedgerTable;
