"use client";

import React, { useRef } from "react";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import { DateFormatter } from "@/utils/helper";
import { useReactToPrint } from "react-to-print";
import { HeaderWidgetForPrintTemp } from "@/components/Helpers/Widgets/HeaderWidgetForPrintTemp";
import Loader from "@/components/global/atoms/Loader";

export const ViewCashBook = ({ CashBookID }: { CashBookID: string }) => {
  const cashBankRef = useRef(null);
  // Get voucher entry bv ID
  const fetchData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.CASH_BOOK.getById}/${CashBookID}`,
      });

      if (res.data.status) {
        return res.data.data;
      } else {
        throw "Something Went Wrong!!";
      }
    } catch (error) {
      console.log(error);
    }
  };

  ///////////// React print
  const handlePrint = useReactToPrint({
    content: () => cashBankRef.current,
  });

  const { data: initialData, isFetching } = useQuery(
    ["cash-book-get-single", CashBookID],
    fetchData
  );

  return (
    <>
      <HeaderWidgetForPrintTemp
        title="Cash Book"
        variant="view"
        handlePrint={handlePrint}
      />
      <div className="shadow-lg border">
        {isFetching ? (
          <Loader />
        ) : (
          <div ref={cashBankRef} className="text-secondary text-lg p-4">
            <table className="table border">
              <thead className="font-bold text-black">
                <th className="border border-black">Sr No</th>
                <th className="border border-black">Date</th>
                <th className="border border-black">Receipt Voucher No</th>
                <th className="border border-black">Code of Account</th>
                <th className="border border-black">L/F</th>
                <th className="border border-black">Amount</th>
              </thead>
              <tbody>
                <tr>
                    <td className="border border-black">1</td>
                    <td className="border border-black">{DateFormatter(initialData?.date)}</td>
                    <td className="border border-black">{initialData?.receipt_voucher_no}</td>
                    <td className="border border-black">{`${initialData?.primary_acc_code?.code} - ${initialData?.primary_acc_code?.description}`}</td>
                    <td className="border border-black">{initialData?.lf_no}</td>
                    <td className="border border-black">{initialData?.amount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};
