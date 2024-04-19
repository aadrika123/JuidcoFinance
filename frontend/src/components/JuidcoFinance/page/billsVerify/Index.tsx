"use client";
import React from "react";
import TableWithFeatures from "./TableWithFeatures";
import ViewButton from "./ViewButton";
import { FINANCE_URL } from "@/utils/api/urls";
import BillLayout from "./BillLayout";
import Image from "next/image";
import list from "@/assets/svg/list.svg";
import details from "@/assets/svg/details.svg";

const HeroBillsVerify = () => {
  //// Columns
  const columns = [
    { name: "id", caption: "Sr. No." },
    {
      name: "receipt_no",
      caption: "Receipt Number",
    },
    {
      name: "receipt_date",
      caption: "Receipt Date",
    },
    {
      name: "receipt_mode",
      caption: "Mode of Receipt",
    },
    {
      name: "paid_by",
      caption: "Paid By",
    },
    {
      name: "cheque_or_draft_no",
      caption: "Cheque / Draft No",
    },
    {
      name: "deposit_date",
      caption: "Date of Deposit",
    },
    {
      name: "realisation_date",
      caption: "Date of Realisation",
    },
    {
      name: "wheather_returned",
      caption: "Wheather Re-turned",
    },
    {
      name: "view",
      caption: "View",
      value: ViewButton,
    },
  ];
  return (
    <BillLayout>
      <section className="border bg-white shadow-xl p-6 px-10">
        <div className="flex items-center mb-4">
          <div
            className={`flex items-center  mr-3 pb-1 w-20 justify-center border-b-2 border-b-black`}
          >
            <Image src={list} height={20} width={20} alt="pro-1" />
            <span className="ml-2 text-gray-500">List</span>
          </div>
          <div
            className={`flex items-center  pb-1 w-28 justify-center`}
          >
            <Image src={details} height={20} width={20} alt="pro-1" />
            <span className="ml-2 text-gray-500">Details</span>
          </div>
        </div>
          <TableWithFeatures
            columns={columns}
            api={FINANCE_URL.RECEIPT_REGISTER.get || ""}
            numberOfRowsPerPage={10}
          />
      </section>
    </BillLayout>
  );
};

export default HeroBillsVerify;
