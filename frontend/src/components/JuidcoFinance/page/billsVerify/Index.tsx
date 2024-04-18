"use client";
import React from "react";
import TableWithFeatures from "./TableWithFeatures";
import ViewButton from "./ViewButton";
import { FINANCE_URL } from "@/utils/api/urls";
import BillLayout from "./BillLayout";

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
      <TableWithFeatures
        columns={columns}
        api={FINANCE_URL.RECEIPT_REGISTER.get || ""}
        numberOfRowsPerPage={10}
      />
    </BillLayout>
  );
};

export default HeroBillsVerify;
