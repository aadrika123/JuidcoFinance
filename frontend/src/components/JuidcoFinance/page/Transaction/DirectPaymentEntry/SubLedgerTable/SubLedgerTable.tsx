"use client";

import React from "react";
import { AddPaymentDetailsData } from "@/utils/types/direct_payment_entry_types";
import TableDropDownList from "@/components/Helpers/TableDropDown";
import { FINANCE_URL } from "@/utils/api/urls";
import InputBox2 from "@/components/Helpers/InputBox2";

interface TableListProps {
  tableList?: AddPaymentDetailsData[];
  dropdown?: React.ReactNode;
  inputBox?: React.ReactNode;
  handleTextChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleSelectChange: (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => void;
  handleRemoveEntry: (index: number) => void;
}

const SubLedgerTable: React.FC<TableListProps> = (props) => {
  //   const SubLedgerData = useSelector(
  //     (state: RootState) => state.paymentDetails.paymentDetails
  //   );

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
            {props.tableList?.map((d, index: number) => (
              <tr key={index} className="border border-zinc-400 text-secondary">
                {/* ID */}
                <td className="border border-zinc-400">{index}</td>
                <td className="border border-zinc-400">
                  <TableDropDownList
                    api={`${FINANCE_URL.GRANT_URL.get}`}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      props.handleSelectChange(e, index)
                    }
                    placeholder="Select Sub-ledger code"
                    value={d?.ledger_code_id}
                    name="1ledger_code_id"
                    className="border-none outline-none"
                  />
                </td>
                <td className="border border-zinc-400 ">
                  <InputBox2
                    type="number"
                    placeholder="Enter Amount"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      props.handleTextChange?.(e, index)
                    }
                    value={d?.amount}
                    name="amount"
                    className="border-none outline-none"
                  />
                  {/* {props.inputBox} */}
                  {/* <div className="flex justify-center">{d?.amount}</div> */}
                </td>

                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">
                    <button type="submit" className="flex justify-center">
                      +
                    </button>
                  </div>
                </td>

                <td className="border border-zinc-400 ">
                  <div className="flex justify-center">
                    <button
                      onClick={() => props.handleRemoveEntry(index)}
                      type="button"
                      className="flex justify-center"
                    >
                      -
                    </button>
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
