"use client";

import React, { useRef } from "react";
import { FINANCE_URL } from "@/utils/api/urls";
import axios from "@/lib/axiosConfig";
import { useQuery } from "react-query";
import { DateFormatter } from "@/utils/helper";
import { useReactToPrint } from "react-to-print";
import { HeaderWidgetForPrintTemp } from "@/components/Helpers/Widgets/HeaderWidgetForPrintTemp";
import Loader from "@/components/global/atoms/Loader";

export const ViewCashBankRVoucher = ({
  ReceiptVoucherID,
}: {
  ReceiptVoucherID: string;
}) => {
  const cashBankRef = useRef(null);
  // Get voucher entry bv ID
  const fetchData = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `${FINANCE_URL.CASH_BANK_R_VOUCHER.getById}/${ReceiptVoucherID}`,
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

  const { data: initialData , isFetching} = useQuery(
    ["cash-bank-r-v-get-single", ReceiptVoucherID],
    fetchData
  );

  return (
    <>
      <HeaderWidgetForPrintTemp
        title="Cash/Bank Receipt Voucher"
        variant="view"
        handlePrint={handlePrint}
      />
      <div className="shadow-lg border">
        {isFetching ? <Loader/> : <div ref={cashBankRef} className="text-secondary text-lg p-4">
          <div className="flex items-center">
            <span className="w-1/3 flex items-center">
              <b>Date:</b>&nbsp;
              <p className="underline">
                {DateFormatter(initialData?.voucher_date)}
              </p>{" "}
            </span>
            <div>
              <span className="flex items-center">
                <p className="underline">{initialData?.ulb?.ulbs}</p> &nbsp;
                <b>Name of the ULB</b>
              </span>
              <b>CASH/BANK RECEIPT VOUCHER</b>
            </div>
          </div>
          <div className="flex items-center justify-between my-6">
            <div className="flex flex-col">
              <span className="flex items-center">
                <b>Name of the Bank:</b> &nbsp;
                <p className="underline">
                  {initialData?.bank?.bank_acc_no}
                </p>{" "}
              </span>
              <span>
                <b>Pay-in-slip Ref. No./Date:</b>&nbsp;__________
              </span>
            </div>
            <div className="flex flex-col">
              <span className="flex items-center">
                <b>NAME OF THE FUND:</b> &nbsp;
                <p className="underline">
                  {initialData?.bank?.bank_type?.name}
                </p>
              </span>
              <span className="flex items-center">
                <b>CRV/BRV No:</b>&nbsp;{" "}
                <p className="underline">{initialData?.crv_brv_no}</p>{" "}
              </span>
            </div>
          </div>
          <div>
            <table className="table">
              <thead className="text-secondary text-base">
                <tr>
                  <th className="border">Code of Account</th>
                  <th className="border">Account Description</th>
                  <th className="border">Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border">
                    {initialData?.primary_acc_code?.code}
                  </td>
                  <td className="border">
                    {initialData?.primary_acc_code?.description}
                  </td>
                  <td className="border">{initialData?.amount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>}
      </div>
    </>
  );
};
